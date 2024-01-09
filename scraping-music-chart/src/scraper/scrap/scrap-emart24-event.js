const express = require('express');
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require('mongoose');
const {emart24Prod} = require("../models/prods");
const mongoUri = 'mongodb://localhost:27017/Scrapping-convenience-store';
mongoose
    .connect(mongoUri, { useNewUrlParser: true })
    .then(() => {
        console.log('mongoose connected');
    })
    .catch((err) => {
        console.log("DB connection fail", err);
    });

// 크롤링
async function emart24(page) {
    const url = `https://www.emart24.co.kr/goods/event?search=&page=${page}&category_seq=&align=`;
    const response = await axios.get(url);
    return response.data
}

// 파싱
emart24(1).then(html =>{
    let prodList = [];
    const $ = cheerio.load(html)
    const $bodyList = $(".mainContents .itemWrap");

    $bodyList.each(function (i, element) {

        prodList[i] = {
            event: $(this).find(".itemTit span").text().trim(),
            img: $(this).find(".itemImg img").attr('src'),
            name: $(this).find("p").text().trim(),
            price: $(this).find(".price").text().trim()
        }
    });
    console.log('prodList', prodList);
    // return prodList;

    // DB 저장
    function saveAllProducts(prodList) {
        Promise.all(prodList.map(item => {
            const prod = new emart24Prod(item);
            return prod.save();
        }))
            .then(() => {
                console.log("모든 항목 저장 성공");
            })
            .catch(err => {
                console.error("저장 실패:", err.message);
            });
    }
    saveAllProducts(prodList);
})

module.exports = emart24();