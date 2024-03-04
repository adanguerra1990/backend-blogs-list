const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const morgan = require('morgan')

mongoose.set('strictQuery', false)

logger.info('Conectando...', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('Conectado a mongodb')
    })
    .catch((error) => {
        console.log('Error al conectar con mongodb', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)


morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan(
    'method::method url::url status::status - :response-time ms body::body'
))
app.get('/', (request, response) => {
    response.send('<h1>Holaa Blogs</h1>')
})
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app