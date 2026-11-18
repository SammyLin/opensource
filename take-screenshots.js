/**
 * Capture full-page screenshots of the local site for PR media.
 *
 * Prerequisites:
 *   1. Serve the site locally, e.g. `cd public && python3 -m http.server 8000`
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

const BASE_URL = process.env.SCREENSHOT_BASE_URL || 'http://localhost:8000/';
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

    await capture('screenshot-zh-hant-desktop', async (page) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await page.waitForSelector('.program-card');
    });

    await capture('screenshot-zh-hans-desktop', async (page) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await page.waitForSelector('.program-card');
        await page.click('#btn-zh-Hans');
        await page.waitForTimeout(400);
    });

    await capture('screenshot-en-desktop', async (page) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await page.waitForSelector('.program-card');
        await page.click('#btn-en');
        await page.waitForTimeout(400);
    });

    await capture('screenshot-zh-hant-mobile-filtered', async (page) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await page.waitForSelector('.program-card');
        await page.click('#filter-ai');
        await page.waitForTimeout(400);
    });

    await browser.close();
    console.log('All screenshots taken successfully!');
}

takeScreenshots().catch((err) => {
    console.error(err);
    process.exit(1);
});
