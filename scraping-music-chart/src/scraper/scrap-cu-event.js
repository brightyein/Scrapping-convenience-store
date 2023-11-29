const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');

// 크롤링
async function cu() {
    const url = 'https://cu.bgfretail.com/event/plus.do?category=event&depth2=1&sf=N';
    const response = await axios.get(url);
    return response.data // -> String
    // console.log('consoleLog', response.data);
}


// 파싱
cu().then(html =>{
    let prodList = [];
    const $ = cheerio.load(html)
    const $bodyList = $('div.relCon');

    console.log('consoleLog', $bodyList);

    $bodyList.each(function (i, element) {
        // console.log($(this).html());

        prodList[i] = {
            name: $(this).find("").text().trim()
        }
    });
    console.log('prodList', prodList);
})