require('dotenv').config()

const http = require('http')
const express = require('express')
const app = express()
const router = require('./service/api/apiRouter')
const fs = require("fs");
const swaggerUi = require('swagger-ui-express')
const YAML = require('yaml')

const swaggerFile = fs.readFileSync('./assets/api-documentation.yaml', 'utf8')
const swaggerDocument = YAML.parse(swaggerFile)

const server = http.createServer(app)

//API documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// API
app.use('/api', router)

app.use('/api/*', function (req, res) {
    res.status(404).send('<p>nothing to see here...   check the <a href="./docs">documentation</a> for information about the api</p>')
})

// possible future frontend
app.use(express.static(process.cwd() + '/dist/'))
// fallback response
app.get('*', function (req, res) {
    res.sendFile(process.cwd() + '/assets/index.html')
})

server.listen(process.env.PORT, () => {
    console.log(`book management backend started new and is listening to port ${process.env.PORT}`)
})