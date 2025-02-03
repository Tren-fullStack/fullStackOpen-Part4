const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    sum = 0
    if (blogs.length === 0) return 0
    else {
      for (i=0; i < blogs.length; i++){
        sum += blogs[i].likes
      }
      return sum
    }
}

const favBlog = (blogs) => {
    likes = []
    if (blogs.length === 0) return 0

    for (i=0; i < blogs.length; i++) {
        likes.push(blogs[i].likes)
    }

    const maxLikes = Math.max(...likes)
    const index = likes.findIndex(max => max === maxLikes)
    const mostLikedBlog = {
        author: blogs[index].author,
        likes: blogs[index].likes,
        title: blogs[index].title
    }

    return mostLikedBlog
}
  
module.exports = { dummy, totalLikes, favBlog }
