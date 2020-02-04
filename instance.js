// instance.js
const puppeteer = require('puppeteer');
let instance = null;
module.exports.getBrowserInstance = async function() {
  if (!instance){
    instance = await puppeteer.launch({
        headless: true,
        devtools: true,
        fullpage: true,
        slowMo: 250,
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome',
        defaultViewport: null,
        args: [
          '--no-sandbox',
          '--user-agent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36"',
          '--lang=en-US,en;q=0.9'
        ],
    });
  }
  return instance;
}
