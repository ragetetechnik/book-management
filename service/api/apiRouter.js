const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const info = require('./endpoints/books')
const logger = require('../../technical services/utils/logger')

router.use(function timeLog (req, res, next) {
    logger.debug('API Request: ' + req.method + ' ' + req.url)
    next()
})

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.use('/books', info)

module.exports = router
