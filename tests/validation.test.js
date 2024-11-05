const { describe, expect, it } = require('@jest/globals')
const { isParsableToInteger, isISBNValid } = require('../technical services/utils/validateRest')

describe('isParsableToInteger', () => {
    it('return true if parsable', () => {
        expect(isParsableToInteger('1')).toBe(true)
        expect(isParsableToInteger('12')).toBe(true)
        expect(isParsableToInteger('832')).toBe(true)
        expect(isParsableToInteger('4z')).toBe(true)
    })

    it('return false if not parsable', () => {
        expect(isParsableToInteger('rut')).toBe(false)
        expect(isParsableToInteger('six')).toBe(false)
    })
})

describe('isISBNValid', () => {
    it('return true if valid', () => {
        expect(isISBNValid('978-0-12-123456-7')).toBe(true)
    })

    it('return false if not valid', () => {
        expect(isISBNValid('1978-0-12-123456-7')).toBe(false)
    })
})
