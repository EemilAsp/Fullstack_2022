const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request,response, next) => {
  const auth = request.get('authorization')
  if(auth && auth.startsWith('Bearer ')){
    request.token = auth.replace('Bearer ', '')
  }else{
    request.token = null
  }
  next()
}

const userExtractor = (request, response, next) => {
  if(request.method === 'GET'){// this is for testing, get doesnt require user validation
    return next()
  }else{
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(decodedToken === null || decodedToken === undefined){
      request.user = null
    }else{
      request.user = User.findById(decodedToken.id)
    }
  next()
}}


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}