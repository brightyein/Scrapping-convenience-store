const axios = require("axios");
const cheerio = require("cheerio");

// 크롤링
async function testFunc () { // async-await : 비동기 함수 -> promise 반환
    const url = 'https://www.genie.co.kr/chart/top200';
    const response = await axios.get(url);
    // console.log('response', response.data)
    // console.log('result', result)
    return response.data // -> String
}

// 파싱
testFunc().then(html =>{ // .then() : 2개의 인자를 받아 1번은 promise 완료 성공 시 호출, 2번은 실패 시 실행
    if (!html){
        throw Error('html data is not defined')
    }
    let albumList = [];
    console.log('html data', typeof html)
    const $ = cheerio.load(html) // 스트링, html -> cheerio : $('tag') 를 사용하면 해당 태그의 모든 요소 선택 가능
    const $bodyList = $("div.music-list-wrap table.list-wrap").find('tr');
    console.log('$bodyList', $bodyList);


    $bodyList.each(function (i, element) {
        const cloneNumber = $(this).find(".number").clone();

        cloneNumber.find('span').remove();

        albumList[i] = {
            song: $(this).find(".title.ellipsis").text().trim(),
            singer: $(this).find(".artist.ellipsis").text(),
            rank : cloneNumber.text().trim(),
            thumbnail: $(this).find(".cover img").attr('src')
        };
    });
    const data = albumList
    console.log('albumList', albumList);
    });

// final result
const result = [
    {singer:'ddd', song:'hello', rank:1, thumbnail:'https://doc.sldkfj.sls'}
]
const text = 'yein'
const data1 = 0
const data2 = ''
const data3 = null
const data4 = undefined
if (data1){
    console.log('result1', typeof data1)
}

console.log('result2', typeof data2)
console.log('result3', typeof data3)
console.log('result4', typeof data4)
