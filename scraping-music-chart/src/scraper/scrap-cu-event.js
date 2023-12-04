// cu 스크래핑
const express = require('express');
const puppeteer = require("puppeteer");

async function run() {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();
    await page.goto('https://cu.bgfretail.com/event/plus.do?category=event&depth2=1&sf=N');

    let eventItems = [];
    let loadMore = true;

    while (loadMore) {
        let newItems = await page.evaluate(() =>
            Array.from(document.querySelectorAll(".prodListWrap ul li"), (e) => ({
                badge: e.querySelector(".badge span").innerText,
                img: e.querySelector(".prod_img img").src,
                name: e.querySelector(".name p").innerText,
                price: e.querySelector(".price").innerText.trim()
            }))
        );
        eventItems = eventItems.concat(newItems);

        loadMore = await page.evaluate(() => {
            let moreButton = document.querySelector("a[href*='javascript:nextPage(1)']");
            if (moreButton) {
                nextPage(1);
                return true;
            } else {
                return false;
            }
        });

        if (loadMore) {
            await page.waitForTimeout(3000); //
        }
    }

    console.log(eventItems);
    await browser.close();
    return eventItems;
}

module.exports = run();