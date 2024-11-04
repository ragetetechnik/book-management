const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

// log levels asc: error,warn,info,debug

const logger = winston.createLogger({
    level: process.env.WINSTON_LOG_LEVEL,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
            return `${localTime(info.timestamp)} ${info.level}: ${info.message}`
        })
    ),
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: 'logs/book-management-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '90d'
        })
    ]
})

function localTime (timestamp) {
    dayjs.extend(timezone)
    dayjs.extend(utc)
    return dayjs(timestamp).utc().tz('Europe/dublin').format()
}

module.exports = logger
