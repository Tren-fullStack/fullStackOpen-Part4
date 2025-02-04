const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const { requestLogger, errorHandler, unknownEndpoint } = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')

mongoose.set('strictQuery', false)  

mongoose.connect(config.MONGODB_URI)
  .then (logger.info('connected to MongoDB'))
  .catch(error => {
    logger.err(`Unable to connect to MongoDB: ${error}`)
    process.exit(1)
  })

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
