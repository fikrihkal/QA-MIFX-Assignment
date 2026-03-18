const { Given, When, Then } = require("@cucumber/cucumber");
const { By, until } = require("selenium-webdriver");
const { getDriver } = require("../../support/hooks");

// Background
Given("user membuka halaman saucedemo", async function () {
  await getDriver().get("https://www.saucedemo.com/");
});

// Login steps
When("user memasukkan username {string} dan password {string}", async function (username, password) {
  const driver = getDriver();
  const usernameField = await driver.wait(until.elementLocated(By.id("user-name")), 10000);
  await usernameField.clear();
  if (username !== "") await usernameField.sendKeys(username);

  const passwordField = await driver.findElement(By.id("password"));
  await passwordField.clear();
  if (password !== "") await passwordField.sendKeys(password);
});

When("user klik tombol login", async function () {
  await getDriver().findElement(By.id("login-button")).click();
});

// Func-001
Then("user berhasil masuk ke halaman inventory", async function () {
  const driver = getDriver();
  await driver.wait(until.urlContains("inventory"), 10000);
  const url = await driver.getCurrentUrl();
  if (!url.includes("inventory")) {
    throw new Error(`Expected inventory page but got: ${url}`);
  }
});

// Func-002 Logout
When("user klik hamburger menu", async function () {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.id("react-burger-menu-btn")), 10000);
  await driver.findElement(By.id("react-burger-menu-btn")).click();
});

When("user klik logout", async function () {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.id("logout_sidebar_link")), 10000);
  await driver.findElement(By.id("logout_sidebar_link")).click();
});

Then("user diarahkan ke halaman login", async function () {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.id("login-button")), 10000);
  const btn = await driver.findElement(By.id("login-button"));
  const isDisplayed = await btn.isDisplayed();
  if (!isDisplayed) {
    throw new Error("Login page not displayed after logout");
  }
});

// Func-003 About
When("user klik about", async function () {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.id("about_sidebar_link")), 10000);
  await driver.findElement(By.id("about_sidebar_link")).click();
});

Then("user diarahkan ke halaman saucelabs", async function () {
  const driver = getDriver();
  await driver.wait(until.urlContains("saucelabs.com"), 15000);
  const url = await driver.getCurrentUrl();
  if (!url.includes("saucelabs.com")) {
    throw new Error(`Expected saucelabs.com but got: ${url}`);
  }
});

// Func-004 Buy item
When("user klik add to cart pada Sauce Labs Backpack", async function () {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.id("add-to-cart-sauce-labs-backpack")), 10000);
  await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();
});

When("user klik shopping cart", async function () {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.className("shopping_cart_link")), 10000);
  await driver.findElement(By.className("shopping_cart_link")).click();
});

When("user klik checkout", async function () {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.id("checkout")), 10000);
  await driver.findElement(By.id("checkout")).click();
});

When("user mengisi first name {string} last name {string} postal code {string}", async function (firstName, lastName, postalCode) {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.id("first-name")), 10000);
  await driver.findElement(By.id("first-name")).sendKeys(firstName);
  await driver.findElement(By.id("last-name")).sendKeys(lastName);
  await driver.findElement(By.id("postal-code")).sendKeys(postalCode);
});

When("user klik continue", async function () {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.id("continue")), 10000);
  await driver.findElement(By.id("continue")).click();
});

When("user klik finish", async function () {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.id("finish")), 10000);
  await driver.findElement(By.id("finish")).click();
});

Then("muncul pesan order berhasil", async function () {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.className("complete-header")), 10000);
  const header = await driver.findElement(By.className("complete-header")).getText();
  if (!header.includes("Thank you")) {
    throw new Error(`Expected thank you message but got: ${header}`);
  }
});

When("user klik back home", async function () {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.id("back-to-products")), 10000);
  await driver.findElement(By.id("back-to-products")).click();
});

// Func-005 Filter
When("user memilih filter {string}", async function (filterOption) {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.className("product_sort_container")), 10000);
  const select = await driver.findElement(By.className("product_sort_container"));
  const options = await select.findElements(By.tagName("option"));
  for (const option of options) {
    const text = await option.getText();
    if (text === filterOption) {
      await option.click();
      break;
    }
  }
});

Then("produk ditampilkan dari harga terendah ke tertinggi", async function () {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.className("inventory_item_price")), 10000);
  const priceElements = await driver.findElements(By.className("inventory_item_price"));
  const prices = [];
  for (const el of priceElements) {
    const text = await el.getText();
    prices.push(parseFloat(text.replace("$", "")));
  }
  for (let i = 0; i < prices.length - 1; i++) {
    if (prices[i] > prices[i + 1]) {
      throw new Error(`Harga tidak urut: ${prices[i]} > ${prices[i + 1]}`);
    }
  }
});

// Func-006, 007, 008, 009, 010 Error messages
Then("muncul pesan error {string}", async function (expectedMessage) {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.css("[data-test='error']")), 10000);
  const errorText = await driver.findElement(By.css("[data-test='error']")).getText();
  if (!errorText.includes(expectedMessage)) {
    throw new Error(`Expected error "${expectedMessage}" but got "${errorText}"`);
  }
});