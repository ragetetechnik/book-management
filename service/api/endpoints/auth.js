const express = require('express')
const router = express.Router()

const logger = require('../../../technical services/utils/logger')
const jwtHandler = require('../../../technical services/utils/jwtHandler')

router.post('/', function (req, res) {
    const user = req.body.user

    const token = jwtHandler.generateToken(user)
    if(token){
        res.status(200)
            .json(token)
    } else {
        res.status(500)
        logger.error('error generating token for ' + req.body.user)
    }
})

module.exports = router
