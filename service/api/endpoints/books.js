const express = require('express')
const router = express.Router()
const database = require('../../../data access layer/databaseAccessBook')
const logger = require('../../../technical services/utils/logger')


router.get('/', (req, res) => {
    database.getAllBooks().then(data => {
        res.status(200)
        res.send(data)
    }).catch(error => {
        res.status(500)
        res.send('error')
        logger.error('error getting info: ' + error)
    })
})

module.exports = router
