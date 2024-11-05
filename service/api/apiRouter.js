const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const books = require('./endpoints/books')
const publishers = require('./endpoints/publishers')
const authors = require('./endpoints/authors')
const categories = require('./endpoints/categories')
const logger = require('../../technical services/utils/logger')

router.use(function timeLog (req, res, next) {
    logger.debug('API Request: ' + req.method + ' ' + req.url)
    next()
})

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.use('/books', books)
router.use('/authors', authors)
router.use('/categories', categories)
router.use('/publishers', publishers)

module.exports = router
