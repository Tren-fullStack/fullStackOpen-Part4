const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { info } = require('../utils/logger')

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  
  // blog needs title and url to be created
  if (!body.title || !body.url) {
    response.status(400).json({ error: 'missing url or title' })
  }
  else {
    let blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    })
    info(`This is the new blog: ${blog}`)

    // makes likes 0 if not given then saves blog to db
    if (!body.likes) {
      blog.likes = 0
      info('added default likes: ', blog.likes)
    }
    blog = await blog.save()
    info('blog id: ', blog._id)

    // adds blod id to that blogs user and re-saves the user to the db
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    
    //shows blog info in terminal and network
    info(`added blog: ${blog.title}, written by ${blog.author}`)
    response.status(201, 'new blog created').json(blog)
  }
})

blogRouter.get('/', async (request, response) => {
  // get blogs and adds their user info to the user field
  const blogs = await Blog.find({}).populate('user', ['username','name'])
  info('Length of blogs: ', blogs.length)
  
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  info(id)
  const result = await Blog.find({ _id:id })

  response.json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  let userId = request.user._id
  userId = userId.toString()
  
  // gets blog info
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)

  // checks that blog exists with request id
  if (!blog) {response.status(400).json({ error: 'no blog found'})}

  const testUserId = blog.user
  info(`id from blog: ${testUserId.toString()} should be same as ${userId} if blog found`)

  // checks that the user making the del request is the same that posted it
  if (testUserId.toString() == userId) {
    await Blog.findByIdAndDelete(blogId) 
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'unathorized user' })
  }
})

blogRouter.put('/:id', async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id)

  await Blog.updateOne( 
    { _id: request.params.id },
    { $inc: {likes: 1} } 
  )
  response.status(201).end()
})

module.exports = blogRouter