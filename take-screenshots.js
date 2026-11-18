/**
 * Capture full-page screenshots of the local site for PR media.
 *
 * Prerequisites:
 *   1. Serve the site locally with `npx wrangler pages dev public --port 8788`
 *      (needed for the /zh-hans/ and /en/ rewrites in public/_redirects)
 *   2. Install Playwright browsers once: `npx playwright install chromium`
 *
 * Usage:
 *   node take-screenshots.js [prefix] [outdir]
 *
 * Examples:
 *   npm run screenshots -- before pr-media/pr2
 *   npm run screenshots -- after pr-media/pr2
 *   node take-screenshots.js after- pr-media
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = (process.env.SCREENSHOT_BASE_URL || 'http://localhost:8788').replace(/\/$/, '');
const rawPrefix = process.argv[2] || '';
const outDir = process.argv[3] || 'pr-media';
const prefix = rawPrefix && !rawPrefix.endsWith('-') && !rawPrefix.endsWith('_')
    ? `${rawPrefix}-`
    : rawPrefix;

async function takeScreenshots() {
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    console.log(`Writing screenshots to ${outDir} (prefix: "${prefix}")...`);
    const browser = await chromium.launch();
    const context = await browser.newContext();

    async function capture(name, setup) {
        const page = await context.newPage();
        await setup(page);
        const filePath = path.join(outDir, `${prefix}${name}.png`);
        await page.screenshot({ path: filePath, fullPage: true });
        await page.close();
        console.log(`Saved ${filePath}`);
    }

    const shots = [
        ['screenshot-zh-hant-desktop', '/', 1440, 900],
        ['screenshot-zh-hans-desktop', '/zh-hans/', 1440, 900],
        ['screenshot-en-desktop', '/en/', 1440, 900],
        ['screenshot-zh-hant-mobile-filtered', '/?cat=ai_tools', 390, 844],
    ];
    for (const [name, urlPath, width, height] of shots) {
        await capture(name, async (page) => {
            await page.setViewportSize({ width, height });
            await page.goto(BASE_URL + urlPath, { waitUntil: 'networkidle' });
            await page.waitForSelector('.card');
        });
    }

    await browser.close();
    console.log('All screenshots taken successfully!');
}

takeScreenshots().catch((err) => {
    console.error(err);
    process.exit(1);
});
