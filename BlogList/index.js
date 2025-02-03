require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)  

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const url = process.env.MONGODB_URI

console.log('connecting to MongoDB')
mongoose.connect(url)
  .then (console.log('connected to MongoDB'))
  .catch(error => {
    console.log(`Unable to connect to MongoDB: ${error}`)
    process.exit(1)
  })

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(err => console.log(`Error retreiving blogs: ${error}`))
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(err => console.log(`Error added new blog: ${err}`))
})

const PORT =  process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})