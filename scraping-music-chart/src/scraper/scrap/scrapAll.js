// 스크립 중앙화
const mongoose = require('mongoose');
const scrapeCu = require('./scrap-cu-event');
const scrapeGs = require('./scrap-gs-event');
const scrapeEmart = require('./scrap-emart24-event');
const cron = require('node-cron');
const {cuProd, gsProd, emart24Prod} = require("../models/prods");
const mongoUri = 'mongodb://localhost:27017/Scrapping-convenience-store';

// DB 연결 일원화 & 스크래핑 자동화
mongoose
    .connect(mongoUri, { useNewUrlParser: true })
    .then(async () => {
        console.log('mongoose connected');

        cron.schedule('0 0 * * *', async () => {
            console.log('Running scraping tasks');

            try {
                await scrapeCu();
                await scrapeGs();
                await scrapeEmart();
                console.log(typeof scrapeEmart);
            } catch (err) {
                console.error('Scraping task failed:', err);
            }
        });

    })
    .catch((err) => {
        console.log("DB connection fail,", err);
    });
