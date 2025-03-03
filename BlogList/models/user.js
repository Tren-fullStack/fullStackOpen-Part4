const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
  username: {
    type: String,
    required: true,
    unique: true, 
  },
  name: {
    type: String,
    required: true,
  },
  passHash: {
    type: String,
    required: true,
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User