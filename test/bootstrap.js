const puppeteer = require('puppeteer');
const path = require('path');

// puppeteer options
const opts = {
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
};

let chrome;

global.sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// expose variables
before (async function () {
  chrome = await puppeteer.launch(opts);
  global.browser = await chrome.newPage();
  global.browser.on('console', msg => console.log('PAGE LOG:', msg.text()));
  await global.browser.goto(`file://${__dirname}/test.html`);
});

// close browser and reset global variables
after (async function () {
  await chrome.close();
});