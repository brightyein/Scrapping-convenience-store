const express = require('express');
const axios = require("axios");
const cheerio = require("cheerio");

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
            img: $(this).find(".itemImg img").attr('src'),
            name: $(this).find("p").text().trim(),
            price: $(this).find(".price").text().trim(),
            event: $(this).find(".itemTit span").text().trim()
        }
    });
    // console.log('prodList', prodList);
    return prodList;
})

module.exports = emart24();