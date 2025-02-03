const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { info } = require('../utils/logger')

blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
    .save()
    .then(result => {
        info(`added blog: ${blog.title}, written by ${blog.author}`)
        response.status(201).json(result)
    })
    .catch(error => next(error))
})

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error))
})

module.exports = blogRouter