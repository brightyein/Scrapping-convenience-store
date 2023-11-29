const axios = require("axios");
const cheerio = require("cheerio");

// axios - 크롤링
async function cgv (){
    const url = 'https://www.cgv.co.kr/theaters/?areacode=02&theaterCode=0348&date=20231125';
    const iframeUrl = 'http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=02&theatercode=0348&date=20231125';

    const response = await axios.get(url);
    const response2 = await axios.get(iframeUrl);

    return {
        mainHtml: response.data,
        iframeHtml: response2.data
    };
}

// cheerio - 파싱
cgv().then(({mainHtml, iframeHtml}) => {

    let movieList = [];
    const main = cheerio.load(mainHtml);
    const $iframe = cheerio.load(iframeHtml);
    const $bodyList22 = main("#ifrm_movie_time_table").attr('src')
console.log('body22', $bodyList22)
    const $bodyList2 = $iframe("div.showtimes-wrap");

    console.log('$bodyList22', $bodyList22);
    console.log('movieInfoList', $bodyList2);

    $bodyList2.each(function (i,el) {

        movieList[i] = {
            movieName: $iframe(this).find("a").text()
        }
    })
    console.log('movieList', movieList);

    let movieInfoList = [];
    const $main = cheerio.load(mainHtml);
    const $bodyList = $main("div.wrap-theater");

    $bodyList.each(function (i,element) {

        movieInfoList[i] = {
            theater: $main(this).find(".theater-tit").text(),
            movieList: movieList
        };
    });

    console.log('movieInfoList',movieInfoList);
});





// final result
const hall = {dimension: '2D', location: '2관 (리클라이너,LASER)', remaining: '총 77석'};
const movie = {movie: 'name', hall};
const result = [
    {theater:'ddd', movieInfo: movie}
]
// console.log('result', result);

