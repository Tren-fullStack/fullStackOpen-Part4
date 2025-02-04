const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { info } = require('../utils/logger')

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    console.log(`This is the new blog: ${blog}`)
    const result = await blog.save()    
    info(`added blog: ${blog.title}, written by ${blog.author}`)
    response.status(201).json(result)
})

blogRouter.get('/', async (request, response) => {
  const result = await Blog.find({})
  console.log('Here is the result: ', result)
  console.log('Length of result: ',result.length)
  return response.json(result)
})

module.exports = blogRouter