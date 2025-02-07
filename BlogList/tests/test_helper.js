const Blog = require('../models/blog')

const testBlogs = [
  {
    "title": "Learning Backend Testing",
    "author": "Stephen Dorssers",
    "url": "https//gotafewc's.com",
    "likes": 5
  },
  {
    "title": "Constantly Cleaning",
    "author": "Joe Rogan",
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

const noUrl = [
  {
    'title': 'All we got to do',
    'author': 'Jamie xx',
    'likes': 4
  }
]

const noTitle = [
  {
    'author': 'Kid Cudi',
    'url': 'https://ManOntheMoon',
    'likes': 3
  }
]

const noUrlandTitle = [
  {
    'author': 'Kanye West',
    'likes': 1000
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
  
module.exports = {
  testBlogs, sampleBlogPost, noUrl, noTitle, noUrlandTitle, blogsInDb
}