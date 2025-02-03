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
  
module.exports = { dummy, totalLikes }
