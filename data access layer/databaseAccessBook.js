const database = require('./database')

const getBooks = function () {
    return new Promise(function (resolve, reject) {
        database('book')
            .select({
                title: 'book.title'
            })
            .then(function (data) {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
    })
}

module.exports = {
    getBooks
}
