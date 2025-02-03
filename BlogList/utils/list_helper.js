const dummy = (blogs) => {
    return 1
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return 0

    author = new Map()
    for (i=0; i < blogs.length; i++) {
        if (author.has(blogs[i].author)) {
            author.set(blogs[i].author, author.get(blogs[i].author) + 1)
        }
        else {author.set(blogs[i].author, 1)}
    }

    maxBlogs = Math.max(...author.values())
    mostAuthor = {
        author: [...author].find(([key,val]) => val === maxBlogs)[0],
        blogs: maxBlogs
    }
    return mostAuthor
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
  
module.exports = { dummy, totalLikes, favBlog, mostBlogs }
