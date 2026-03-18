const { Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

setDefaultTimeout(60000);

let driver;

function getDriver() {
  return driver;
}

Before(async function () {
  const options = new chrome.Options();
  options.addArguments("--no-sandbox");
  options.addArguments("--disable-dev-shm-usage");
  options.addArguments("--disable-gpu");
  options.addArguments("--remote-debugging-port=9222");

  const service = new chrome.ServiceBuilder(
    require("chromedriver").path
  );

  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .setChromeService(service)
    .build();

  await driver.manage().setTimeouts({ implicit: 10000 });
  await driver.manage().window().maximize();
});

After(async function () {
  if (driver) {
    await driver.quit();
  }
});

module.exports = { getDriver };