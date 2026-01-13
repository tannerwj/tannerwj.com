const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const sites = [
  // Projects (400x250 aspect)
  { url: 'https://handlaundry.com/', name: 'project-handlaundry.jpg', width: 1200, height: 750 },
  { url: 'https://humlesssentinel.com/', name: 'project-humless.jpg', width: 1200, height: 750 },
  { url: 'https://lunch.tannerwj.com/', name: 'project-lunch.jpg', width: 1200, height: 750 },
  { url: 'https://mafia.tannerwj.com/', name: 'project-mafia.jpg', width: 1200, height: 750 },
  
  // Affiliates (400x300 aspect)
  { url: 'https://www.coinbase.com/', name: 'affiliate-coinbase.jpg', width: 1200, height: 900 },
  { url: 'https://robinhood.com/', name: 'affiliate-robinhood.jpg', width: 1200, height: 900 },
  { url: 'https://www.sofi.com/', name: 'affiliate-sofi.jpg', width: 1200, height: 900 },
  { url: 'https://www.monarchmoney.com/', name: 'affiliate-monarch.jpg', width: 1200, height: 900 },
  { url: 'https://proton.me/mail', name: 'affiliate-proton.jpg', width: 1200, height: 900 },
  { url: 'https://privacy.com/', name: 'affiliate-privacy.jpg', width: 1200, height: 900 },
  { url: 'https://www.starlink.com/', name: 'affiliate-starlink.jpg', width: 1200, height: 900 },
  { url: 'https://www.litter-robot.com/', name: 'affiliate-litterrobot.jpg', width: 1200, height: 900 },
  { url: 'https://www.tesla.com/', name: 'affiliate-tesla.jpg', width: 1200, height: 900 },
  { url: 'https://www.cookunity.com/', name: 'affiliate-cookunity.jpg', width: 1200, height: 900 },
  { url: 'https://www.eightsleep.com/', name: 'affiliate-eightsleep.jpg', width: 1200, height: 900 },
  { url: 'https://www.amazon.com/', name: 'affiliate-amazon.jpg', width: 1200, height: 900 },
];

(async () => {
  const imgDir = path.join(__dirname, 'public', 'images');
  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  
  for (const site of sites) {
    console.log(`Capturing ${site.url}...`);
    try {
      const context = await browser.newContext({
        viewport: { width: site.width, height: site.height },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      });
      const page = await context.newPage();
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(imgDir, site.name), type: 'jpeg', quality: 85 });
      await context.close();
      console.log(`  ✓ Saved ${site.name}`);
    } catch (err) {
      console.log(`  ✗ Failed: ${err.message}`);
    }
  }
  
  await browser.close();
  console.log('Done!');
})();
