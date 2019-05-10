const puppeteer = require("puppeteer");
const { generateText, checkAndGenerate } = require("./util");

// unit testing as single function
test("should output name and age", () => {
  const text = generateText("Max", 29);
  expect(text).toBe("Max (29 years old)");
});

// integration testing a function with a callback
test("should generate a valid text output", () => {
  const text = checkAndGenerate("Max", 29);
  expect(text).toBe("Max (29 years old)");
});

// E2E testing (all the steps) with puppeteer
test("should create an element with text and correct class", async () => {
  const browser = await puppeteer.launch({
    headless: true
    // slowMo: 80,
    // args: ["--window-size=1920,1080"]
  });
  const page = await browser.newPage();
  await page.goto(
    "file:///C:/Users/todorovicd/Documents/testingDom/index.html"
  );

  // Actions on the page
  await page.click("input#name");
  await page.type("input#name", "Damjan");
  await page.click("input#age");
  await page.type("input#age", "25");
  await page.click("#btnAddUser");

  const finalText = await page.$eval(".user-item", el => el.textContent);
  expect(finalText).toBe("Anna (29 years old)");
}, 10000);
