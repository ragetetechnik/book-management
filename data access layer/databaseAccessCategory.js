const database = require('./database')
const logger = require('../technical services/utils/logger')

const getAllCategories = function () {
    return new Promise(function (resolve, reject) {
        database('categories')
            .select({
                id: 'categories.id',
                last_name: 'categories.name'
            })
            .groupBy('categories.id')
            .then(function (data) {
                resolve(data)
            }).catch(error => {
                logger.error(error)
                reject({ status: 500, message: 'server error' })
            })
    })
}

const getCategory = function (id) {
    return new Promise(function (resolve, reject) {
        database('categories')
            .where('categories.id', id)
            .select()
            .first()
            .then(function (data) {
                if (data) {
                    resolve(data)
                } else {
                    reject('not found')
                }
            }).catch(error => {
                logger.error(error)
                reject(error)
            })
    })
}

module.exports = {
    getCategory,
    getAllCategories
}
