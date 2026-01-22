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

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();

    try {
        // --- 1. Session Persistence (Cookie Injection) ---
        if (process.env.X_COOKIES) {
            console.log('X_COOKIES detected. Attempting to inject session...');
            try {
                const cookies = JSON.parse(process.env.X_COOKIES);
                await context.addCookies(cookies);
                console.log('Session cookies injected successfully.');
            } catch (cookieError) {
                console.error('Failed to parse X_COOKIES. Ensure it is a valid JSON array.');
            }
        }

        // Relaxed navigation for slow CI environments
        await page.goto('https://x.com/home', { waitUntil: 'domcontentloaded', timeout: 120000 });
        console.log('Page navigation to x.com/home initiated. Waiting for specific elements...');
        await page.waitForTimeout(10000); // 10s wait for dynamic content

        // Check if we are already logged in
        const tweetButtonLocator = page.locator('[data-testid="SideNav_NewTweet_Button"], [data-testid="AppTabBar_Home_Link"]');
        if (await tweetButtonLocator.first().isVisible()) {
            console.log('Successfully bypassed login using session cookies!');
            loginSuccess = true;
        } else {
            console.log('Session cookies expired or missing. Proceeding to standard login...');
            await page.goto('https://x.com/i/flow/login', { waitUntil: 'domcontentloaded', timeout: 120000 });

            // Wait for input (username)
            const usernameInput = page.locator('input[autocomplete="username"]');
            await usernameInput.waitFor({ timeout: 30000 });
            await usernameInput.fill(process.env.X_USERNAME);
            await page.keyboard.press('Enter');

            // Multi-stage login handler
            console.log('Username submitted. Entering multi-stage login handler...');

            for (let i = 0; i < 7; i++) {
                await page.waitForTimeout(5000);
                const currentUrl = page.url();
                const bodyText = await page.innerText('body').catch(() => '');
                console.log(`Login Step ${i + 1} | URL: ${currentUrl}`);

                // 1. Password Screen
                const passwordInput = page.locator('input[name="password"]');
                if (await passwordInput.isVisible()) {
                    console.log('Password field detected. Entering password...');
                    await passwordInput.fill(process.env.X_PASSWORD);
                    await page.keyboard.press('Enter');
                    await page.waitForTimeout(5000);
                    continue;
                }

                // 2. Identity Verification (Email/Username/Phone)
                if (bodyText.includes('verification') || bodyText.includes('identity') || bodyText.includes('suspicious') || bodyText.includes('phone or email') || bodyText.includes('check your email') || bodyText.includes('confirm your email')) {
                    console.log('Identity challenge detected. Attempting to solve...');
                    if (process.env.X_EMAIL) {
                        const idInput = page.locator('input[name="text"], input[data-testid="challenge_response"], input[autocomplete="email"]');
                        if (await idInput.first().isVisible()) {
                            await idInput.first().fill(process.env.X_EMAIL);
                            await page.keyboard.press('Enter');
                            console.log('Submitted X_EMAIL for verification.');
                            await page.waitForTimeout(5000);
                            continue;
                        }
                    } else {
                        console.error('X_EMAIL missing - cannot solve challenge.');
                    }
                }

                // 3. Just another Username prompt
                const secondUsernameInput = page.locator('input[autocomplete="username"]');
                if (await secondUsernameInput.isVisible()) {
                    console.log('Username requested again. Filling...');
                    await secondUsernameInput.fill(process.env.X_USERNAME);
                    await page.keyboard.press('Enter');
                    continue;
                }

                // 4. Check for success
                if (await tweetButtonLocator.first().isVisible() || currentUrl.includes('/home')) {
                    console.log('Login successful! Home screen detected.');
                    loginSuccess = true;
                    break;
                }
            }

            if (!loginSuccess) {
                console.log('Waiting for Twitter Home feed (final check)...');
                await page.waitForSelector('[data-testid="SideNav_NewTweet_Button"]', { timeout: 30000 }).catch(() => {
                    console.log('Final wait for Tweet Button timed out.');
                });
            }
        }

        // --- 2. Post Tweet ---
        await page.waitForSelector('[data-testid="SideNav_NewTweet_Button"]', { timeout: 15000 });
        await page.click('[data-testid="SideNav_NewTweet_Button"]');

        const editor = page.locator('[data-testid="tweetTextarea_0"]');
        await editor.waitFor();
        await editor.fill(tweetText);

        await page.click('[data-testid="tweetButton"]');
        await page.waitForTimeout(3000);
        console.log('Tweet posted successfully via Playwright!');

    } catch (error) {
        console.error('Failed to post via Playwright:', error);
        try {
            await page.screenshot({ path: 'playwright-failure.png', fullPage: true });
            console.log('Screenshot of failure saved to playwright-failure.png');
        } catch (screenshotError) {
            console.error('Failed to capture screenshot:', screenshotError);
        }
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
