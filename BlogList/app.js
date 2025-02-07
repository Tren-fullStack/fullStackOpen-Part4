const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')
const logger = require('./utils/logger')
const { getToken, requestLogger, errorHandler, unknownEndpoint } = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false) 

mongoose.connect(config.MONGODB_URI)
  .catch(error => {
    logger.err(`Unable to connect to MongoDB: ${error}`)
})

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(getToken)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
