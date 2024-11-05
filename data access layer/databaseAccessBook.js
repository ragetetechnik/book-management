const database = require('./database')
const logger = require('../technical services/utils/logger')

const getAllBooks = function () {
    return new Promise(function (resolve, reject) {
        database('books')
            .select({
                id: 'books.id',
                title: 'books.title'
            })
            .groupBy('books.id')
            .then(function (data) {
                resolve(data)
            }).catch(error => {
                logger.error(error)
                reject({ status: 500, message: 'server error' })
            })
    })
}

const getFilteredBooks = function (category) {
    return new Promise(function (resolve, reject) {
        database('books')
            .join('categories', 'books.category_id', 'categories.id')
            .where('categories.name', category)
            .select({
                id: 'books.id',
                title: 'books.title'
            })
            .then(function (data) {
                if (data.length > 0) {
                    resolve(data)
                } else {
                    reject({ status: 204, message: 'no content' })
                }
            }).catch(error => {
                logger.error(error)
                reject({ status: 500, message: 'server error' })
            })
    })
}

const getBook = function (id) {
    return new Promise(function (resolve, reject) {
        database('books')
            .where('books.id', id)
            .join('book_author', 'books.id', 'book_author.book_id')
            .join('authors', 'book_author.author_id', 'authors.id')
            .join('publishers', 'books.publisher_id', 'publishers.id')
            .join('categories', 'books.category_id', 'categories.id')
            .select({
                title: 'books.title',
                isbn: 'books.isbn',
                condition: 'books.condition',
                publication_year: 'books.publication_year',
                publisher: 'publishers.name',
                category: 'categories.name',
                authors: database.raw('GROUP_CONCAT(CONCAT(authors.first_name, " ", authors.last_name) SEPARATOR ", ")')
            })
            .first()
            .then(function (data) {
                if (data) {
                    resolve(data)
                } else {
                    reject({ status: 404, message: 'not found' })
                }
            }).catch(error => {
                logger.error(error)
                reject({ status: 500, message: 'server error' })
            })
    })
}

const deleteBook = function (id) {
    return new Promise(function (resolve, reject) {
        getBook(id).then(() => {
            database('books')
                .where('books.id', id)
                .delete()
                .then(function () {
                    resolve('deleted')
                }).catch(error => {
                    logger.error(error)
                    reject({ status: 500, message: 'server error' })
                })
        }).catch(error => {
            reject(error)
        })
    })
}

const updateBook = function (id, data) {
    return new Promise(function (resolve, reject) {
        getBook(id).then(() => {
            database.transaction(async (trans) => {
                const { authors, ...bookData } = data
                try {
                    //Update the book record
                    await trans('books')
                        .where('books.id', id)
                        .update(bookData)
                    //Update book_authors
                    if (authors) {
                        await trans('book_author')
                            .where('book_id', id)
                            .del()
                        const newAssociations = authors.map(authorId => ({
                            book_id: id,
                            author_id: authorId
                        }))
                        await trans('book_author').insert(newAssociations)
                    }
                    // Commit the transaction
                    await trans.commit()
                    resolve('updated')
                } catch (error) {
                    // Rollback transaction
                    await trans.rollback()
                    logger.error(error)
                    reject({ status: 500, message: 'server error' })
                }
            }).then(function () {
                resolve('updated')
            }).catch(error => {
                reject(error)
            })
        })
    })
}

const createBook = function (bookData) {
    return new Promise(function (resolve, reject) {
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
                const authorsToFillInTable = []
                bookData.authors.forEach((author) => {
                    authorsToFillInTable.push(
                        database('book_author')
                            .insert({
                                book_id: data,
                                author_id: author
                            })
                    )
                })
                Promise.all(authorsToFillInTable)
                    .then(() => {
                        resolve(data[0])
                    })
                    .catch(error => {
                        logger.error('fill book_author table error, attempt to undo book creation ' + error)
                        deleteBook(data[0]).then(() => {
                            logger.error('book creation ' + data + ' successfully undone')
                            reject({ status: 500, message: 'server error' })
                        }).catch(error => {
                            logger.error('book creation ' + data + ' cant be undone ' + error)
                            reject(error)
                        })
                    })
            }).catch(error => {
                reject(error)
            })
    })
}

module.exports = {
    getAllBooks,
    getBook,
    deleteBook,
    updateBook,
    createBook,
    getFilteredBooks
}
