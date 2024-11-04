require('dotenv').config()

const http = require('http')
const express = require('express')
const app = express()

const server = http.createServer(app)

// API
app.use('/api', function (req, res) {
    res.status(200).send('<p>book management api</p>')
})

app.use('/*', function (req, res) {
    res.status(404).send('<p>nothing to see here...   check the <a href="./docs">documentation</a> for information about the api</p>')
})

server.listen(process.env.PORT, () => {
    console.log(`book management backend started new and is listening to port ${process.env.PORT}`)
})