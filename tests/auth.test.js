const jwt = require('jsonwebtoken')
const { describe, beforeEach, it, expect } = require('@jest/globals')
const { verifyToken, generateToken } = require('../technical services/utils/jwtHandler')

// Mock environment variables
process.env.JWT_SECRET_KEY = 'dg3443Rfq34'
process.env.USER_WRITE = 'admin'
process.env.USER_READ = 'test'

describe('Auth module', () => {
    describe('generateToken', () => {
        it('should generate a token with correct payload', () => {
            const user = 'write_user'
            const token = generateToken(user)

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
            expect(decodedToken.user).toBe(user)
            expect(decodedToken).toHaveProperty('expirationDate')
        })
    })

    describe('verifyToken', () => {
        let req, res, next

        beforeEach(() => {
            req = { headers: { authorization: '' } }
            res = {
                status: jest.fn(() => res),
                json: jest.fn()
            }
            next = jest.fn()
        })

        it('should proceed with valid token and write role', async () => {
            const token = generateToken('admin')
            req.headers.authorization = `Bearer ${token}`

            await verifyToken(req, res, next)

            expect(req.accountRole).toBe('write')
            expect(next).toHaveBeenCalled()
        })

        it('should proceed with valid token and read role', async () => {
            const token = generateToken('test')
            req.headers.authorization = `Bearer ${token}`

            await verifyToken(req, res, next)

            expect(req.accountRole).toBe('read')
            expect(next).toHaveBeenCalled()
        })

        it('should proceed with valid token but no role', async () => {
            const token = generateToken('someOtherName')
            req.headers.authorization = `Bearer ${token}`

            await verifyToken(req, res, next)

            expect(req.accountRole).toBe(undefined)
            expect(next).not.toHaveBeenCalled()
        })

        it('should respond 401 if expired', async () => {
            const token = jwt.sign(
                { user: 'write_user', expirationDate: new Date(Date.now() - 1000) },
                process.env.JWT_SECRET_KEY
            )
            req.headers.authorization = `Bearer ${token}`

            await verifyToken(req, res, next)

            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.json).toHaveBeenCalledWith('invalid bearer 2')
            expect(next).not.toHaveBeenCalled()
        })

        it('should respond 401 if invalid', async () => {
            req.headers.authorization = 'Bearer invalid_token'

            await verifyToken(req, res, next)

            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.json).toHaveBeenCalledWith('invalid bearer 3')
            expect(next).not.toHaveBeenCalled()
        })

        it('should respond 401 if no authorization header is provided', async () => {
            req.headers.authorization = undefined

            await verifyToken(req, res, next)

            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.json).toHaveBeenCalledWith('no bearer')
            expect(next).not.toHaveBeenCalled()
        })
    })
})
