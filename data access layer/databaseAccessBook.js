const database = require('./database')

const getAllBooks = function () {
    return new Promise(function (resolve, reject) {
        database('books')
            .select({
                title: 'books.title'
            })
            .then(function (data) {
                resolve(data)
            }).catch(error => {
            if (error === 'specific') {
                reject({ status: 403, send: 'forbidden' })
            } else {
                console.log(error)
                reject({ status: 500, send: 'error' })
            }
        })
    })
}

const getBook = function(id) {
    return new Promise(function(resolve, reject) {
        resolve();
    });
}

const deleteBook = function(id) {
    return new Promise(function(resolve, reject) {
        resolve();
    });
}

const updateBook = function(id) {
    return new Promise(function(resolve, reject) {
        resolve();
    });
}

const createBook = function(id) {
    return new Promise(function(resolve, reject) {
        resolve();
    });
}

module.exports = {
    getAllBooks,
    getBook,
    deleteBook,
    updateBook,
    createBook
}
