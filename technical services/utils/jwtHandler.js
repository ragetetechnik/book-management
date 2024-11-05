const jwt = require('jsonwebtoken')
const logger = require('../../technical services/utils/logger')

function getValidAccount (user) {
    return new Promise(function (resolve, reject) {
        //normally in a database, would give back user id for determine if operations are allowed for certain users
        if (user === process.env.USER_WRITE) {
            resolve('write')
        }
        if (user === process.env.USER_READ) {
            resolve('read')
        }
        reject('no role')
    })
}
const verifyToken = function (req, res, next) {
    const bearerHeader = req.headers.authorization
    if (typeof bearerHeader !== 'undefined') {
        try {
            const bearerToken = bearerHeader.split(' ')[1]
            const token = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY)
            if (token.hasOwnProperty('user') && !isTokenExpired(token)) {
                getValidAccount(token.user).then(role => {
                    req.accountRole = role
                    next()
                }).catch(() => {
                    res.status(401)
                        .json('invalid bearer 1')
                })
            } else {
                res.status(401)
                    .json('invalid bearer 2')
            }
        } catch (error) {
            res.status(401)
                .json('invalid bearer 3')
        }
    } else {
        res.status(401)
            .json('no bearer')
    }
}

const isTokenValid = function (token) {
    return token !== '' && token !== null
}

const isTokenExpired = function (token) {
    if (isTokenValid(token)) {
        const now = new Date()
        const tokenExpired = new Date(getExpiredDate(token).toString())
        return now >= tokenExpired
    }
}

const getExpiredDate = function (token) {
    if (isTokenValid(token)) {
        return token.expirationDate
    }
    return false
}

const generateToken = (user) => {
    logger.info('generated Token for user: ' + user)
    const expirationDate = new Date()
    expirationDate.setHours(new Date().getHours() + 1)
    return jwt.sign({ user, expirationDate }, process.env.JWT_SECRET_KEY)
}

module.exports = {
    verifyToken,
    generateToken
}
