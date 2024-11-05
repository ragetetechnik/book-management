const database = require('./database')
const logger = require("../technical services/utils/logger");

const getAllPublishers = function () {
    return new Promise(function (resolve, reject) {
        database('publishers')
            .select({
                id: 'publishers.id',
                last_name: 'publishers.name',
            })
            .groupBy('publishers.id')
            .then(function (data) {
                resolve(data)
            }).catch(error => {
            logger.error(error)
            reject({ status: 500, message: 'server error' })
        })
    })
}

const getPublisher = function(id) {
    return new Promise(function(resolve, reject) {
        database('publishers')
            .where('publishers.id', id)
            .select()
            .first()
            .then(function (data) {
                if(data){
                    resolve(data)
                } else {
                    reject('not found')
                }
            }).catch(error => {
                logger.error(error)
                reject(error)
        })
    });
}

module.exports = {
    getPublisher,
    getAllPublishers
}
