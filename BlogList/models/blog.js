const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  author: String,
  url: String,
  likes: Number,
  },  {
  virtuals: {
    blogId: {
      get() {return this._id.toHexString();}
    }
  } 
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.blogId = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
    
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog  