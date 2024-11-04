const express = require('express')
const router = express.Router()
const database = require('../../../data access layer/databaseAccessBook')

router.get('/', (req, res) => {
    database.getBooks().then(data => {
        res.status(200)
        res.send(data)
    }).catch(error => {
        res.status(500)
        res.send('error')
        console.log('error getting info: ' + error)
    })
})

module.exports = router
