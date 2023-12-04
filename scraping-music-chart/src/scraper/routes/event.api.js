const express = require('express')
const router = express.Router()
const scrapeGS25 = require('../scrap-gs-event')
const scrapeEmart24 = require('../scrap-emart24-event')
const scrapeCU = require('../scrap-cu-event')

router.get('/gs', async (req, res) => {
    try {
        const items = await scrapeGS25;
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while fetching GS25 events');
    }
});

router.get('/cu', async (req, res) => {
    try {
        const items = await scrapeCU;
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while fetching CU events');
    }
});

router.get('/emart24', async (req, res) => {
    try {
        const items = await scrapeEmart24;
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while fetching Emart24 events');
    }
});

module.exports = router;