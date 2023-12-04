const express = require('express')
const router = express.Router()
const eventApi = require('./event.api')

router.use('/event', eventApi)

module.exports = router;