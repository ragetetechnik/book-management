const express = require('express')
const router = express.Router()
const databaseAuthor = require('../../../data access layer/databaseAccessAuthor')

const logger = require('../../../technical services/utils/logger')

router.get('/', (req, res) => {
    databaseAuthor.getAllAuthors().then(data => {
        res.status(200)
            .json(data)
    }).catch(error => {
        res.status(error.status || 500)
            .json(error.message)
        logger.error('error getAllAuthors: ' + error)
    })
})

module.exports = router
