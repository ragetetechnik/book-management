const express = require('express')
const router = express.Router()
const databasePublisher = require('../../../data access layer/databaseAccessPublisher')

const logger = require('../../../technical services/utils/logger')

router.get('/', (req, res) => {
    databasePublisher.getAllPublishers().then(data => {
        res.status(200)
            .json(data)
    }).catch(error => {
        res.status(error.status || 500)
            .json(error.message)
        logger.error('error getAllPublishers: ' + error)
    })
})

module.exports = router
