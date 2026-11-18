const { chromium } = require('playwright');
const fs = require('fs');

async function takeScreenshots() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    
    console.log('Creating pr-media directory...');
    if (!fs.existsSync('pr-media')) {
        fs.mkdirSync('pr-media');
    }
    
    // Desktop screenshots - Traditional Chinese
    console.log('Taking zh-Hant desktop screenshot...');
    const pageZhHant = await context.newPage();
    await pageZhHant.setViewportSize({ width: 1920, height: 1080 });
    await pageZhHant.goto('http://localhost:8000');
    await pageZhHant.waitForTimeout(1000);
    await pageZhHant.screenshot({ 
        path: 'pr-media/screenshot-zh-hant-desktop.png',
        fullPage: true 
    });
    await pageZhHant.close();
    
    // Desktop screenshots - Simplified Chinese
    console.log('Taking zh-Hans desktop screenshot...');
    const pageZhHans = await context.newPage();
    await pageZhHans.setViewportSize({ width: 1920, height: 1080 });
    await pageZhHans.goto('http://localhost:8000');
    await pageZhHans.waitForTimeout(500);
    await pageZhHans.click('#btn-zh-Hans');
    await pageZhHans.waitForTimeout(1000);
    await pageZhHans.screenshot({ 
        path: 'pr-media/screenshot-zh-hans-desktop.png',
        fullPage: true 
    });
    await pageZhHans.close();
    
    // Desktop screenshots - English
    console.log('Taking English desktop screenshot...');
    const pageEn = await context.newPage();
    await pageEn.setViewportSize({ width: 1920, height: 1080 });
    await pageEn.goto('http://localhost:8000');
    await pageEn.waitForTimeout(500);
    await pageEn.click('#btn-en');
    await pageEn.waitForTimeout(1000);
    await pageEn.screenshot({ 
        path: 'pr-media/screenshot-en-desktop.png',
        fullPage: true 
    });
    await pageEn.close();
    
    // Mobile screenshot - Traditional Chinese with filter
    console.log('Taking zh-Hant mobile screenshot with filter...');
    const pageMobile = await context.newPage();
    await pageMobile.setViewportSize({ width: 390, height: 844 });
    await pageMobile.goto('http://localhost:8000');
    await pageMobile.waitForTimeout(1000);
    
    // Apply a filter (e.g., AI Tools)
    await pageMobile.click('#filter-ai');
    await pageMobile.waitForTimeout(500);
    
    await pageMobile.screenshot({ 
        path: 'pr-media/screenshot-zh-hant-mobile-filtered.png',
        fullPage: true 
    });
    await pageMobile.close();
    
    await browser.close();
    console.log('All screenshots taken successfully!');
}

takeScreenshots().catch(console.error);
