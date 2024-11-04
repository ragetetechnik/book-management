const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const info = require('./endpoints/books')

router.use(function timeLog (req, res, next) {
    console.log('API Request: ' + req.method + ' ' + req.url)
    next()
})

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.use('/book', info)

module.exports = router
