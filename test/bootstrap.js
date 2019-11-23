const puppeteer = require('puppeteer');

// puppeteer options
const opts = {
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
};

let chrome;

// expose variables
before (async function () {
  chrome = await puppeteer.launch(opts);
  global.browser = await chrome.newPage();
  browser.on('console', msg => console.log('PAGE LOG:', msg.text()));
  await browser.goto(`file://${__dirname}/test.html`);
});

// close browser and reset global variables
after (async function () {
  await chrome.close();
});