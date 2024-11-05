const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const books = require('./endpoints/books')
const publishers = require('./endpoints/publishers')
const authors = require('./endpoints/authors')
const categories = require('./endpoints/categories')
const logger = require('../../technical services/utils/logger')
const auth = require('./endpoints/auth')

const jwtHandler = require('../../technical services/utils/jwtHandler')

router.use(function timeLog (req, res, next) {
    logger.debug('API Request: ' + req.method + ' ' + req.url)
    next()
})

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.use('/auth', auth)
router.use('/books', jwtHandler.verifyToken, books)
router.use('/authors', jwtHandler.verifyToken, authors)
router.use('/categories', jwtHandler.verifyToken, categories)
router.use('/publishers', jwtHandler.verifyToken, publishers)

module.exports = router
