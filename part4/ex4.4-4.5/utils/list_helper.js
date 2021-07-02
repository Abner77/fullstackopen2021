const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const red = blogs.map(b => b.likes)
  const result = red.reduce((a, b) => a + b, 0)

  return result
}

const favoriteBlog = (blogs) => {
  const max = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })
  return max
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
