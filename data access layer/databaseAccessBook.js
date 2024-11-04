const database = require('./database')
const logger = require("../technical services/utils/logger");

const getAllBooks = function () {
    return new Promise(function (resolve, reject) {
        database('books')
            .select({
                id: 'books.id',
                title: 'books.title'
            })
            .then(function (data) {
                logger.debug(data)
                resolve(data)
            }).catch(error => {
                logger.error(error)
                reject({ status: 500, message: 'server error' })
        })
    })
}

const getBook = function(id) {
    return new Promise(function(resolve, reject) {
        database('books')
            .where('books.id', id)
            .select()
            .first()
            .then(function (data) {
                logger.debug(data)
                if(data){
                    resolve(data)
                } else {
                    reject({ status: 404, message: 'not found' })
                }
            }).catch(error => {
                logger.error(error)
                reject({ status: 500, message: 'server error' })
            })
    });
}

const deleteBook = function(id) {
    return new Promise(function (resolve, reject) {
        getBook(id).then(() => {
            database('books')
                .where('books.id', id)
                .delete()
                .then(function () {
                    resolve('deleted')
                }).catch(error => {
                logger.error(error)
                reject({status: 500, message: 'server error'})
            })
        }).catch(error => {
            reject(error)
        })

    });
}

const updateBook = function(id, data) {
    return new Promise(function(resolve, reject) {
        getBook(id).then(() => {
        database('books')
            .where('books.id', id)
            .first()
            .update(data)
            .then(function () {
                resolve('updated')
            }).catch(error => {
                logger.error(error)
                reject({status: 500, message: 'server error'})
            })
        }).catch(error => {
            reject(error)
        })
    });
}

const createBook = function(bookData) {
    return new Promise(function(resolve, reject) {
        database('books')
            .insert({
                title: bookData.title,
                isbn: bookData.isbn,
                condition: bookData.condition,
                publication_year: bookData.publication_year,
                publisher_id: bookData.publisher_id,
                category_id: bookData.category_id
                })
            .then(data => {
                //ToDo book_author table
                resolve(data[0])

         }).catch(error => {
            reject(error)
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

const getCategory = function(id) {
    return new Promise(function(resolve, reject) {
        database('categories')
            .where('categories.id', id)
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
    getAllBooks,
    getBook,
    deleteBook,
    updateBook,
    createBook,
    getPublisher,
    getAuthor,
    getCategory
}
