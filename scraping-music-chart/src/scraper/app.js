const express = require('express');
const indexRouter = require('./routes/index');
const { MongoClient } = require("mongodb");
const uri = 'mongodb://localhost:27017';
co

const app = express()

app.use('',indexRouter)

app.listen(3000, () => {
    console.log("server on 3000");
});