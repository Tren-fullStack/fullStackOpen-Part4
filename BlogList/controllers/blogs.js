const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { info } = require('../utils/logger')

blogRouter.post('/', async (request, response) => {
  const body = request.body
  info('body', body)

  const user = await User.findById(body.user)
  
  // blog needs title and url to be created
  if (!body.title || !body.url) {
    response.sendStatus(400, 'missing url or title')
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
  const blogs = await Blog.find({}).populate('user', ['username','name','passHash'])
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