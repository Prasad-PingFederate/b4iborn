const { chromium } = require('playwright');
const { TwitterApi } = require('twitter-api-v2');

// Keywords to identify music-related trends
const MUSIC_KEYWORDS = [
    'music', 'song', 'album', 'artist', 'single', 'release', 'track', 'concert', 
    'spotify', 'youtube', 'vibe', 'soundtrack', 'ost', 'bgm', 'lyrical', 'video',
    'listen', 'remix', 'singer', 'rapper', 'melody', 'tune', 'piano', 'guitar',
    'thaman', 'anirudh', 'rahman', 'devi sri prasad', 'sid sriram', 'arijit', // Popular in India
    'Taylor Swift', 'BTS', 'Blackpink', 'Drake', 'Weeknd' // Global
];

async function getTrends() {
    console.log('Starting Trend Discovery via Playwright...');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    // We use trends24.in as it's easier to scrape than X.com directly without login
    // Targetting India as the user seems to be based there, but this can be changed
    await page.goto('https://trends24.in/india/');
    
    // Wait for the list to load
    await page.waitForSelector('.trend-card__list');

    const trends = await page.evaluate(() => {
        // Collect the top trends from the first (most recent) card
        const listItems = document.querySelectorAll('.trend-card:first-child li a');
        return Array.from(listItems).map(item => item.textContent);
    });

    console.log('Current Trends:', trends);
    await browser.close();
    return trends;
}

function findMusicTrend(trends) {
    for (const trend of trends) {
        const lowerTrend = trend.toLowerCase();
        for (const keyword of MUSIC_KEYWORDS) {
            if (lowerTrend.includes(keyword.toLowerCase())) {
                return { trend, keyword };
            }
        }
    }
    return null;
}

async function postTweetViaPlaywright(tweetText) {
    console.log('Attempting to post via Playwright (Browser Automation)...');
    
    if (!process.env.X_USERNAME || !process.env.X_PASSWORD) {
        throw new Error('X_USERNAME and X_PASSWORD environment variables are required for Playwright posting.');
    }

    const browser = await chromium.launch({ headless: true }); // Headless might be detected by X
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();

    try {
        await page.goto('https://x.com/i/flow/login');
        
        // Wait for input (username)
        const usernameInput = page.locator('input[autocomplete="username"]');
        await usernameInput.waitFor({ timeout: 10000 });
        await usernameInput.fill(process.env.X_USERNAME);
        await page.keyboard.press('Enter');

        // Check for unusual activity warning (asking for email/phone)
        try {
            const unusualActivity = await page.waitForSelector('text=phone or email', { timeout: 3000 });
            if (unusualActivity) {
                console.log('X asked for verification (unusual activity).');
                // If you have an email env var, you could fill it here, but it's complex
                if (process.env.X_EMAIL) {
                    const input = page.locator('input[name="text"]');
                    await input.fill(process.env.X_EMAIL);
                    await page.keyboard.press('Enter');
                }
            }
        } catch (e) {
            // No unusual activity prompt, continue
        }

        // Wait for password
        const passwordInput = page.locator('input[name="password"]');
        await passwordInput.waitFor({ timeout: 10000 });
        await passwordInput.fill(process.env.X_PASSWORD);
        await page.keyboard.press('Enter');

        // Wait for home page
        await page.waitForSelector('[data-testid="SideNav_NewTweet_Button"]', { timeout: 15000 });
        
        // Click compose
        await page.click('[data-testid="SideNav_NewTweet_Button"]');
        
        // Type tweet
        const editor = page.locator('[data-testid="tweetTextarea_0"]');
        await editor.waitFor();
        await editor.fill(tweetText);
        
        // Send
        await page.click('[data-testid="tweetButton"]');
        
        // Wait for confirmation or redirect
        await page.waitForTimeout(3000);
        console.log('Tweet posted successfully via Playwright!');

    } catch (error) {
        console.error('Failed to post via Playwright:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

async function postTweetViaAPI(tweetText) {
    console.log('Attempting to post via Twitter API...');
    
    const client = new TwitterApi({
        appKey: process.env.TWITTER_API_KEY,
        appSecret: process.env.TWITTER_API_SECRET,
        accessToken: process.env.TWITTER_ACCESS_TOKEN,
        accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });

    try {
        await client.v2.tweet(tweetText);
        console.log('Tweet posted successfully via API!');
    } catch (error) {
        console.error('Failed to post via API:', error);
        throw error;
    }
}

async function main() {
    try {
        const trends = await getTrends();
        const match = findMusicTrend(trends);
        
        if (match) {
            console.log(`Matched Trend: ${match.trend} (Keyword: ${match.keyword})`);
            
            const promotionalMessages = [
                `Loving the vibe of ${match.trend}? 🎶 Create your own tunes and unleash your inner composer on PlayTune Studio! 🎹✨ \n\nTry it now: https://b4iborn.com \n\n#${match.trend.replace(/\s/g, '')} #Music #Creativity #PlayTune`,
                `Everyone's talking about ${match.trend}! If you love music, you'll love playing the virtual instruments at PlayTune Studio. 🎸🎹 \n\nPlay here: https://b4iborn.com \n\n#${match.trend.replace(/\s/g, '')} #MusicLover #OnlinePiano`,
                `Ride the wave of ${match.trend} with some music recreation! 🎼 Check out our online instruments at b4iborn.com. \n\n#${match.trend.replace(/\s/g, '')} #MusicTrends #PlayTune`
            ];
            
            const tweetText = promotionalMessages[Math.floor(Math.random() * promotionalMessages.length)];
            console.log('Draft Tweet:', tweetText);

            if (process.env.DRY_RUN) {
                console.log('Dry Run mode enabled. Skipping actual post.');
                return;
            }

            // Priority: API > Playwright
            if (process.env.TWITTER_API_KEY) {
                await postTweetViaAPI(tweetText);
            } else if (process.env.X_USERNAME) {
                await postTweetViaPlaywright(tweetText);
            } else {
                console.error('No credentials found! Set TWITTER_API_* keys OR X_USERNAME/X_PASSWORD in environment.');
                process.exit(1);
            }

        } else {
            console.log('No music-related trends found at this time.');
        }

    } catch (error) {
        console.error('Error running promotion script:', error);
        process.exit(1);
    }
}

main();
