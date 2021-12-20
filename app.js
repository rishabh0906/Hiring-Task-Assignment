const puppy = require("puppeteer");

let main = async () => {
  const Browser = await puppy.launch({
    headless: false,
    args: ["--window-size=1366,728"],
    defaultViewport: false,
  });
  const tabs = await Browser.pages();
  const tab = tabs[0];
  await tab.goto("https://www.wikipedia.org/");
  await tab.waitForSelector("#js-link-box-en");
  await tab.click("#js-link-box-en");
  await tab.waitForSelector(".portal-hright.portal-vbot");
  await tab.click(".portal-hright.portal-vbot");
  await tab.waitForSelector('a[title="Wikipedia:Contents/A–Z index"]');
  await tab.click('a[title="Wikipedia:Contents/A–Z index"]');
  await tab.waitForSelector('a[title="Special:AllPages/R"]');
  await tab.click('a[title="Special:AllPages/R"]');
  await tab.waitForSelector('a[title="R"]');
  await tab.click('a[title="R"]');
  FetchContent(tab);

  //   await Browser.close();
};

let FetchContent = async (tab) => {
  await tab.waitForSelector("li.toclevel-1>a");
  let contentLink = await tab.$$("li.toclevel-1>a");
  let contentSelector = [];
  for (let i = 0; i < contentLink.length; i++) {
    let value = await contentLink[i].evaluate((e) => {
      return e.getAttribute("href");
    });

    contentSelector[i] = `a[href="${value}"]`;
  }

  await tab.waitForSelector(contentSelector[0]);
  await tab.click(contentSelector[0]);
  await tab.click(contentSelector[1]);
};

main();
