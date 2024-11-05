const Ajv = require('ajv')
const ajv = new Ajv()

const isISBNValid = function (isbn) {
    // Regular expression for ISBN-13 with hyphens
    const isbnRegex = /^97[89]-\d-\d{2}-\d{6}-\d$/;
    return isbnRegex.test(isbn);
};

const isBookCreateValid = function (bookObject) {
    return validateBookCreate(bookObject)
}

const isBookUpdateValid = function (bookObject) {
    return validateBookUpdate(bookObject)
}

const isParsableToInteger = function (id) {
    return Number.isInteger(parseInt(id, 10));
}

const validateBookCreate = (jsonObject) => {
    const schema = {
        type: 'object',
            properties: {
                title: { type: 'string' },
                isbn: { type: 'string' },
                condition: { type: 'string' },
                publication_year: { type: 'integer' },
                publisher_id: { type: 'integer' },
                category_id: { type: 'integer' },
                authors: {
                    type: 'array',
                    items: { type: 'integer' },
                    minItems: 1
                }
            },
        required: ['title', 'isbn', 'condition', 'publication_year', 'publisher_id', 'category_id', 'authors']
    }

    const validate = ajv.compile(schema)
    const isValid = validate(jsonObject)

    if (!isValid) {
        return validate.errors.map((error) => error.message)
    }
    return null
}

const validateBookUpdate = (jsonObject) => {
    const schema = {
        type: 'object',
        properties: {
            title: { type: 'string' },
            isbn: { type: 'string' },
            condition: { type: 'string' },
            publication_year: { type: 'integer' },
            publisher_id: { type: 'integer' },
            category_id: { type: 'integer' },
            authors: {
                type: 'array',
                items: { type: 'integer' },
                minItems: 1
            }
        }
    }

    const validate = ajv.compile(schema)
    const isValid = validate(jsonObject)

    if (!isValid) {
        return validate.errors.map((error) => error.message)
    }

    const hasAtLeastOneField = Object.keys(jsonObject).some((key) => schema.properties[key])

    if (!hasAtLeastOneField) {
        return "At least one valid field is required for update"
    }
    return null
}

module.exports = {
    isISBNValid,
    isBookCreateValid,
    isBookUpdateValid,
    isParsableToInteger
}
