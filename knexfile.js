require('dotenv').config()

module.exports = {
    development: {
        client: process.env.LOCAL_DB_CLIENT || 'mysql2',
        connection: {
            host: process.env.LOCAL_DB_HOST,
            user: process.env.LOCAL_DB_USER,
            password: process.env.LOCAL_DB_PASS,
            database: process.env.LOCAL_DB_NAME,
            port: process.env.LOCAL_DB_PORT,
            ssl: false
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
    staging: {
        client: process.env.DOCKER_DB_CLIENT || 'mysql2',
        connection: {
            host: process.env.DOCKER_DB_HOST,
            user: process.env.DOCKER_DB_USER,
            password: process.env.DOCKER_DB_PASS,
            database: process.env.DOCKER_DB_NAME,
            port: process.env.DOCKER_DB_PORT,
            ssl: false
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
