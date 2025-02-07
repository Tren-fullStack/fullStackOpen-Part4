const { info, err } = require('./logger')

const requestLogger = (request, response, next) => {
  info('Method:', request.method)
  info('Path:  ', request.path)
  info('Body:  ', request.body)
  info('')
  info('---')
  next()
}

// formats the token by grabbing from the authorization header
const getToken = (request, response, next) => {
  let authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    authorization = authorization.replace('Bearer ', '')
    console.log(authorization)
    request.token = authorization
  }

  next()
}

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  err(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }  else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error collection')) {
    return response.status(400).json({ error: 'expected `username` to be unique'})
  }  else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token is invalid' })
  }
  next(error)
}

module.exports = {
  getToken,
  requestLogger,
  unknownEndpoint,
  errorHandler
}