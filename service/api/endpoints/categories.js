const express = require('express')
const router = express.Router()
const databaseCategory = require('../../../data access layer/databaseAccessCategory')

const logger = require('../../../technical services/utils/logger')

router.get('/', (req, res) => {
    databaseCategory.getAllCategories().then(data => {
        res.status(200)
            .json(data)
    }).catch(error => {
        res.status(error.status || 500)
            .json(error.message)
        logger.error('error getAllCategories: ' + error)
    })
})

module.exports = router
