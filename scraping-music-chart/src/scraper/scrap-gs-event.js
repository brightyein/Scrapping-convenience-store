// gs25 스크래핑
const express = require('express');
const puppeteer = require('puppeteer');

async function scrapeGS25() {
    const browser = await puppeteer.launch({headless: "true"});
    const page = await browser.newPage();
    await page.goto('http://gs25.gsretail.com/gscvs/ko/products/event-goods#;', { timeout: 60000, waitUntil: 'networkidle0'});

    const eventItems = await page.evaluate(() => {

        const allTblwraps = document.querySelectorAll('.tblwrap.mt50');
        const lastTblwrap = allTblwraps[allTblwraps.length - 1];

        return Array.from(lastTblwrap.querySelectorAll('ul li')).map(e => ({
            event: e.querySelector(".flg01").innerText,
            img: e.querySelector(".img img").src,
            name: e.querySelector(".tit").innerText,
            price: e.querySelector(".cost").innerText
        }))
    });

    // console.log(evevtItems);

    await browser.close();
    return eventItems;
}

module.exports = scrapeGS25();