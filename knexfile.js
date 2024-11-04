require('dotenv').config()

module.exports = {
    development: {
        client: process.env.LOCAL_DB_CLIENT || 'mysql',
        connection: {
            host: process.env.LOCAL_DB_HOST,
            user: process.env.LOCAL_DB_USER,
            password: process.env.LOCAL_DB_PASS,
            database: process.env.LOCAL_DB_NAME,
            port: process.env.LOCAL_DB_PORT,
            ssl: true
        },
        pool: { min: 0, max: 7 },
        migrations: {
            tableName: 'initial',
            directory: './data access layer/database/migrations'
        },
        seeds: {
            directory: './data access layer/database/seeds'
        }
    },
    test: {
        client: process.env.LOCAL_DB_CLIENT || 'mysql',
        connection: {
            host: process.env.LOCAL_DB_HOST,
            user: process.env.LOCAL_DB_USER,
            password: process.env.LOCAL_DB_PASS,
            database: process.env.LOCAL_DB_NAME,
            port: process.env.LOCAL_DB_PORT,
            ssl: true
        },
        pool: { min: 0, max: 7 },
        migrations: {
            tableName: 'initial',
            directory: './data access layer/database/migrations'
        },
        seeds: {
            directory: './data access layer/database/seeds'
        }
    },
    production: {
        client: process.env.DB_CLIENT || 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            ssl: true
        },
        pool: { min: 0, max: 7 },
        migrations: {
            tableName: 'initial',
            directory: './data access layer/database/migrations'
        },
        seeds: {
            directory: './data access layer/database/seeds'
        }
    }
}
