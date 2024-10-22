const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {

  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    defaultViewport: null,
    headless: true,
  });
  const pages = await browser.pages();
  const page = pages[pages.length - 1];

  let keywords = fs.readFileSync('keywords.txt', {encoding: 'utf-8'});
  keywords = keywords.split(/[\r\n]/);
  keywords = keywords.filter(item => item !== '');

  for (let i = 0; i < keywords.length; i++) {
    const keyword = keywords[i];

    await page.goto(`https://ad.search.naver.com/search.naver?where=ad&query=${keyword}&x=0&y=0`, {
      waitUntil: 'networkidle2'
    });

    const target = await page.waitForSelector('div[id="wrap"]');

    if (!fs.existsSync('capture')) {
      fs.mkdirSync('capture');
    }

    await target.screenshot({
      path: `capture/${String(i).padStart(4, '0')}_${keyword}.png`
    });
  }

  await browser.close();
})();