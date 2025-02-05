const Blog = require('../models/blog')

const testBlogs = [
  {
    "title": "Learning Backend Testing",
    "author": "Hov",
    "url": "https//gotafewc's.com",
    "likes": 5
  },
  {
    "title": "Constantly Cleaning",
    "author": "Young Thug",
    "url": "https//youmakeit.com",
    "likes": 10
  },
]
 
const sampleBlogPost = [
  {
    "title": "Adore me",
    "author": "King Krule",
    "url": "https//horizon.com",
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
  
module.exports = {
  testBlogs, sampleBlogPost, blogsInDb
}