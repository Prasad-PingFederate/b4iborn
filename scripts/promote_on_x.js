const { chromium } = require('playwright');
const { TwitterApi } = require('twitter-api-v2');

// Keywords to identify music and entertainment-related trends
const MUSIC_KEYWORDS = [
    // Core Music
    'music', 'song', 'album', 'artist', 'single', 'release', 'track', 'concert',
    'spotify', 'youtube', 'vibe', 'soundtrack', 'ost', 'bgm', 'lyrical', 'video',
    'listen', 'remix', 'singer', 'rapper', 'melody', 'tune', 'piano', 'guitar',
    'musician', 'band', 'performance', 'live', 'stage', 'musical', 'instrument',
    'thaman', 'anirudh', 'rahman', 'devi sri prasad', 'sid sriram', 'arijit', // Popular in India
    'Justin Bieber', 'Ed Sheeran', 'Dua Lipa', 'Adele', 'Bruno Mars',
    'Taylor Swift', 'BTS', 'Blackpink', 'Drake', 'Weeknd', // Global

    // Entertainment & Movies
    'entertainment', 'celebrity', 'actor', 'actress', 'film', 'movie', 'cinema',
    'trailer', 'teaser', 'premiere', 'blockbuster', 'sandalwood', 'tollywood', 'bollywood',
    'hollywood', 'netflix', 'disney', 'marvel', 'streaming', 'awards', 'oscar',

    // Religious Music / Devotional (as requested)
    'jesus', 'christ', 'christian', 'worship', 'prayer', 'devotional', 'gospel', 'church', 'hymn',
    'praise', 'spiritual', 'bible', 'scripture', 'blessing', 'faith', 'lord',

    // General Viral / Trending
    'trending', 'viral', 'everyone', 'amazing', 'listen', 'hit', 'spectacular', 'wow', 'incredible'
];

const LOCATIONS = [
    { name: 'India', path: 'india/' },
    { name: 'USA', path: 'united-states/' },
    { name: 'UK', path: 'united-kingdom/' },
    { name: 'Global', path: '' } // Trends24 home is global
];

async function getTrends(locationPath = 'india/') {
    console.log(`Starting Trend Discovery for ${locationPath || 'Global'} via Playwright...`);
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(`https://trends24.in/${locationPath}`, { waitUntil: 'domcontentloaded' });

        // Wait for the list to load
        await page.waitForSelector('.trend-card__list', { timeout: 10000 });

        const trends = await page.evaluate(() => {
            const listItems = document.querySelectorAll('.list-container:first-child .trend-link');
            return Array.from(listItems).map(item => item.textContent.trim());
        });

        console.log(`Trends found:`, trends.length > 0 ? trends.slice(0, 5).join(', ') + '...' : 'None');
        return trends;
    } catch (error) {
        console.error(`Error fetching trends for ${locationPath}:`, error.message);
        return [];
    } finally {
        await browser.close();
    }
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
        return true;
    } catch (error) {
        if (error.code === 403) {
            console.error('ERROR 403: Forbidden. Your X Developer App may have "Read-only" permissions or incorrect credentials.');
            console.error('Check: https://developer.twitter.com/en/portal/dashboard');
        } else if (error.code === 402) {
            console.error('ERROR 402: Payment Required (CreditsDepleted). Your X API quota is exhausted.');
            console.error('The script will attempt to fall back to Browser Automation (Playwright).');
        } else {
            console.error('Failed to post via API:', error.message);
        }
        return false;
    }
}

async function main() {
    try {
        let match = null;

        // Try searching trends by location until we find a match
        for (const loc of LOCATIONS) {
            const trends = await getTrends(loc.path);
            match = findMusicTrend(trends);
            if (match) {
                console.log(`Matched Trend in ${loc.name}: ${match.trend} (Keyword: ${match.keyword})`);
                break;
            }
        }

        if (match) {
            const promotionalMessages = [
                `Loving the vibe of ${match.trend}? 🎶 Create your own tunes and unleash your inner composer on PlayTune Studio! 🎹✨ \n\nTry it now: https://b4iborn.com \n\n#${match.trend.replace(/\s/g, '')} #Music #Creativity #PlayTune`,
                `Everyone's talking about ${match.trend}! If you love music or movies, you'll love playing virtual instruments at PlayTune Studio. 🎸🎹 \n\nPlay here: https://b4iborn.com \n\n#${match.trend.replace(/\s/g, '')} #Entertainment #OnlinePiano`,
                `Ride the wave of ${match.trend} with some soulful music! 🎼 Check out our virtual piano and instruments at b4iborn.com. Perfect for worship and creativity! 🕊️ \n\n#${match.trend.replace(/\s/g, '')} #MusicTrends #PlayTune`,
                `Inspired by ${match.trend}? 🌟 Music connects us all. Compose your own masterpiece on the fly at PlayTune Studio! 🎼🎻 \n\nGet started: https://b4iborn.com \n\n#${match.trend.replace(/\s/g, '')} #Trending #MusicLover`
            ];

            const tweetText = promotionalMessages[Math.floor(Math.random() * promotionalMessages.length)];
            console.log('Draft Tweet:', tweetText);

            if (process.env.DRY_RUN) {
                console.log('Dry Run mode enabled. Skipping actual post.');
                return;
            }

            // Attempt to post: API first, then Playwright fallback
            let posted = false;

            // Optional: Skip API if PREFER_PLAYWRIGHT is set
            const useApiFirst = !process.env.PREFER_PLAYWRIGHT && !!process.env.TWITTER_API_KEY;

            if (useApiFirst) {
                posted = await postTweetViaAPI(tweetText);
            } else if (process.env.PREFER_PLAYWRIGHT) {
                console.log('PREFER_PLAYWRIGHT is set. Skipping API and using Browser Automation.');
            }

            if (!posted && process.env.X_USERNAME) {
                console.log('Using Playwright (Browser Automation) for posting...');
                try {
                    await postTweetViaPlaywright(tweetText);
                    posted = true;
                } catch (pwError) {
                    console.error('Playwright post also failed.');
                }
            }

            if (!posted) {
                console.error('Failed to post tweet via both API and Browser Automation.');
                process.exit(1);
            }

        } else {
            console.log('No relevant trends found in any of the targeted locations.');
        }

    } catch (error) {
        console.error('Critical internal error:', error);
        process.exit(1);
    }
}

main();
