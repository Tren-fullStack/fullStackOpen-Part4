const Blog = require('../models/blog')

const testBlogs = [
  {
    "title": "Learning Backend Testing",
    "author": "Hov",
    "url": "https//gotafewc's.com",
    "likes": 5
  },
  {
    "title": "Learning Backend Testing",
    "author": "Young Thug",
    "url": "https//youmakeit.com",
    "likes": 10
  },
]
  
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
  
module.exports = {
  testBlogs, blogsInDb
}