const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { info } = require('../utils/logger')

blogRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    response.sendStatus(400, 'missing url or title')
  }
  else {
    const blog = new Blog(request.body)
    info(`This is the new blog: ${blog}`)
    if (!request.body.likes) {
      blog.likes = 0
      info('added default likes: ', blog.likes)
    }

    const result = await blog.save()
    info(`added blog: ${blog.title}, written by ${blog.author}`)

    response.status(201, 'new blog created').json(result)
  }
})

blogRouter.get('/', async (request, response) => {
  const result = await Blog.find({})
  info('Here is the result: ', result)
  info('Length of result: ',result.length)
  
  response.json(result)
})

blogRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  info(id)
  const result = await Blog.find({ _id:id })

  response.json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.deleteOne({ id:request.body.id }) 
  response.sendStatus(204, 'blog deleted')
})

blogRouter.put('/:id', async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id)
  info(blogToUpdate.likes)

  const likes = blogToUpdate.likes + 1
  info(likes)

  await Blog.updateOne( {likes: likes} )
  response.sendStatus(201, 'blog\'s likes updated')
})

module.exports = blogRouter