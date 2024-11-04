const Ajv = require('ajv')
const ajv = new Ajv()

const isMailValid = function (mail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(mail)
}

const isNameValid = function (name) {
    return (typeof name === 'string' && name.length <= 64)
}

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
                category_id: { type: 'integer' }
            },
        required: ['title', 'isbn', 'condition', 'publication_year', 'publisher_id', 'category_id']
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
            category_id: { type: 'integer' }
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
    isMailValid,
    isBookCreateValid,
    isBookUpdateValid,
    isNameValid,
    isParsableToInteger
}
