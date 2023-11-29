const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');

// 크롤링
async function gs() {
    const url = 'http://gs25.gsretail.com/gscvs/ko/products/event-goods#;';
    const response = await axios.get(url);
    return response.data // -> String
    // console.log('consoleLog', response.data);
}


// 파싱
gs().then(html =>{
    let prodList = [];
    const $ = cheerio.load(html)
    const $bodyList = $(".eventtab div");

    // console.log('consoleLog', $bodyList);

    $bodyList.each(function (i, element) {
        let nameContent = "";

        const style = $(this).attr("style");
        if (style && style.includes("display: block")) {
            nameContent = $(this).find("ul.prod_list").text().trim();
        }

        console.log(nameContent);

        prodList[i] = {

            name: nameContent
        }
    });
    console.log('prodList', prodList);
})