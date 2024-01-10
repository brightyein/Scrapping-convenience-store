// gs25 스크래핑
const express = require('express');
const puppeteer = require('puppeteer');
const {gsProd, emart24Prod} = require("../models/prods");

// 크롤링
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

    // DB 저장
    function saveAllProducts(eventItems) {

        gsProd.deleteMany({})
            .then(() => {
                return Promise.all(eventItems.map(item => {
                    const prod = new gsProd(item);
                    return prod.save();
                }))
            })

            .then(() => {
                console.log("모든 항목 저장 성공");
            })
            .catch(err => {
                console.error("저장 실패:", err.message);
            });
    }
    saveAllProducts(eventItems);

    console.log('eventItems', eventItems);

    await browser.close();
    return eventItems;
}

module.exports = scrapeGS25;