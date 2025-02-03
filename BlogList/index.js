const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGODB_URI, PORT } = require('./utils/config')
const { info, err } = require('./utils/logger')
const { requestLogger, errorHandler, unknownEndpoint } = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')

mongoose.set('strictQuery', false)  

mongoose.connect(MONGODB_URI)
  .then (info('connected to MongoDB'))
  .catch(error => {
    err(`Unable to connect to MongoDB: ${error}`)
    process.exit(1)
  })

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})