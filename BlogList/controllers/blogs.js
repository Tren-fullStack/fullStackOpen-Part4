const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { info } = require('../utils/logger')

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    info(`This is the new blog: ${blog}`)
    if (!request.body.likes) {
      blog.likes = 0
      console.log('added default likes: ', blog.likes)
    }

    const result = await blog.save()
    info(`added blog: ${blog.title}, written by ${blog.author}`)

    response.status(201).json(result)
})

blogRouter.get('/', async (request, response) => {
  const result = await Blog.find({})
  info('Here is the result: ', result)
  info('Length of result: ',result.length)
  
  response.json(result)
})

module.exports = blogRouter