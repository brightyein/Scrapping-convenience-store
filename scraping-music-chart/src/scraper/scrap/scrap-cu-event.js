// cu 스크래핑
const express = require('express');
const puppeteer = require("puppeteer");
const mongoose = require('mongoose');
const {cuProd} = require("../models/prods");
const mongoUri = 'mongodb://localhost:27017/Scrapping-convenience-store';

// DB 연결
mongoose
    .connect(mongoUri, { useNewUrlParser: true })
    .then(() => {
        console.log('mongoose connected');
    })
    .catch((err) => {
        console.log("DB connection fail", err);
    });


async function run() {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();
    await page.goto('https://cu.bgfretail.com/event/plus.do?category=event&depth2=1&sf=N');

    let eventItems = [];
    let loadMore = true;

    while (loadMore) {
    let newItems = await page.evaluate(() =>
        Array.from(document.querySelectorAll(".prodListWrap ul li"), (e) => ({
            event: e.querySelector(".badge span").innerText,
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

    // DB 저장
    function saveAllProducts(eventItems) {

        // 먼저 기존 데이터 모두 삭제
        cuProd.deleteMany({})
            .then(() => {
                // 새 데이터 저장
                return Promise.all(eventItems.map(item => {
                    const prod = new cuProd(item);
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

    await browser.close();

}

module.exports = run();