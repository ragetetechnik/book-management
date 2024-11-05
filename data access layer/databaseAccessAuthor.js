const database = require('./database')
const logger = require("../technical services/utils/logger");

const getAllAuthors = function () {
    return new Promise(function (resolve, reject) {
        database('authors')
            .select({
                id: 'authors.id',
                last_name: 'authors.last_name',
            })
            .groupBy('authors.id')
            .then(function (data) {
                resolve(data)
            }).catch(error => {
            logger.error(error)
            reject({ status: 500, message: 'server error' })
        })
    })
}

const getAuthor = function(id) {
    return new Promise(function(resolve, reject) {
        database('authors')
            .where('authors.id', id)
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
    getAuthor,
    getAllAuthors
}
