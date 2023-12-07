const express = require('express');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost:27017/Scrapping-convenience-store';
mongoose
    .connect(mongoUri, { useNewUrlParser: true })
    .then(() => {
        console.log('mongoose connected');
    })
    .catch((err) => {
        console.log("DB connection fail", err);
    });

const app = express()

app.listen(3000, () => {
    console.log("server on 3000")
});

app.use('',indexRouter)