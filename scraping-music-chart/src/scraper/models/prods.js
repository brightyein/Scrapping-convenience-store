const mongoose = require('mongoose');
const { models } = require("mongoose");
const Schema = mongoose.Schema;

const prodSchema = Schema({ // 작업지시서
    event:{
        type: String
    },
    img:{
        type: String
    },
    name:{
        type: String
    },
    price: {
        type: String
    }
})

const Prod = mongoose.model("Prod", prodSchema);

module.exports = Prod;