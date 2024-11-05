const express = require('express')
const router = express.Router()
const databaseAuthor = require('../../../data access layer/databaseAccessAuthor')
const databaseBook = require('../../../data access layer/databaseAccessBook')
const databaseCategory = require('../../../data access layer/databaseAccessCategory')
const databasePublisher = require('../../../data access layer/databaseAccessPublisher')


const logger = require('../../../technical services/utils/logger')
const validateRest = require('../../../technical services/utils/validateRest')

router.get('/', (req, res) => {
    const categoryFilter = req.query.category;
    if(!categoryFilter){
        databaseBook.getAllBooks().then(data => {
            res.status(200)
                .json(data)
        }).catch(error => {
            res.status(error.status || 500)
                .json(error.message)
            logger.error('error getAllBooks: ' + error)
        })
    }else{
        databaseBook.getFilteredBooks(categoryFilter).then(data => {
            res.status(200)
                .json(data)
        }).catch(error => {
            res.status(error.status || 500)
                .json(error.message)
            logger.error('error getFilteredBooks: ' + error)
        })
    }



})

router.get('/:bookId', (req, res) => {
    if (!validateRest.isParsableToInteger(req.params.bookId)) {
        res.status(400)
            .json('Bad request, id has to be a integer')
        return
    }

    //ToDo: join for text instead of ids
    databaseBook.getBook(req.params.bookId).then(data => {
        res.status(200)
            .json(data)
    }).catch(error => {
        res.status(error.status || 500)
            .json(error.message)
        logger.error('getAllBooks: ' + error.status + ' ' + error.message )
    })
})

router.delete('/:bookId', (req, res) => {
    if (!validateRest.isParsableToInteger(req.params.bookId)) {
        res.status(400)
            .json('Bad request, id has to be a integer')
        return
    }
    databaseBook.deleteBook(req.params.bookId).then(() => {
        logger.info('book with id ' + req.params.bookId + ' deleted')
        res.status(200)
            .json('deleted')
    }).catch(error => {
        res.status(error.status || 500)
            .json(error.message)
        logger.error('deleteBook: ' + error.status + ' ' + error.message )
    })
})

router.put('/:bookId', (req, res) => {
    let bookData = req.body
    if (validateRest.isBookUpdateValid(bookData)) {
        res.status(422)
            .json('invalid data received: ' + validateRest.isBookCreateValid(bookData))
        return
    }
    validateRelatives(bookData).then(() => {
        databaseBook.updateBook(req.params.bookId, bookData).then(() => {
            logger.info('book with id ' + req.params.bookId + ' updated')
            res.status(200)
                .json('updated')
        }).catch(error => {
            res.status(error.status || 500)
                .json(error.message)
            logger.error('updateBook: ' + error.status + ' ' + error.message )
        })
    }).catch(error => {
        res.status(error.status || 500)
            .json(error.message)
        logger.error('validateRelatives: ' + error.status + ' ' + error.message )
    })
})



router.post('/', (req, res) => {
    let bookData = req.body
    if (validateRest.isBookCreateValid(bookData)) {
        res.status(422)
            .json('invalid data received: ' + validateRest.isBookCreateValid(bookData))
        return
    }
    if (!validateRest.isISBNValid(bookData.isbn)){
        res.status(422)
            .json('invalid isbn received')
        return
    }

    validateRelatives(bookData).then(() => {
        databaseBook.createBook(bookData).then(data => {
            logger.info('book with id ' + data + ' created')
            res.status(201)
                .json(data);
        }).catch(error => {
            res.status(error.status || 500)
                .json(error.message)
            logger.error('createBook: ' + error.status + ' ' + error.message )
        })
    }).catch(error => {
        res.status(error.status || 500)
            .json(error.message)
    })
})

const validateRelatives = function(bookData) {
    return new Promise(function(resolve, reject) {

        let relativesToValidate = [];

        if(bookData.category_id){
            relativesToValidate.push(databaseCategory.getCategory(bookData.category_id))
        }
        if(bookData.publisher_id){
            relativesToValidate.push(databasePublisher.getPublisher(bookData.publisher_id))
        }
        if(bookData.authors){
            bookData.authors.forEach((author) => {
                relativesToValidate.push(databaseAuthor.getAuthor(author))
            })
        }
        Promise.all(relativesToValidate)
            .then(() => {
                resolve()
            })
            .catch(error => {
                reject({status: 422, message: 'check publisher, author and category id'});
                logger.error('validating publisher, author and category: ' + error);
            });
    })
}

module.exports = router
