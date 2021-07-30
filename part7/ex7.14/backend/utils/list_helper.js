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

const mostBlogs = (blogs) => {
  const listAuthors = []
  blogs.forEach(b => {
    if (listAuthors.indexOf(b.author) === -1) { listAuthors.push({ author: b.author, count: 0 }) }
  })
  listAuthors.forEach(a => { a.count = blogs.filter(b => b.author === a.author).length })
  const reducedCount = Math.max(...listAuthors.map(a => a.count))
  return listAuthors.filter(a => a.count === reducedCount)[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
