const dummy = (blogs) => {
    return 1;
  }

const totalLikes = (blogs) =>{
    return(blogs.reduce((total, blog) => total + blog.likes, 0))
}

const favoriteBlog = (blogs) =>{
    var maxx
    for (var i=0; i<blogs.length; i++){
      if(maxx == null || parseInt(blogs[i]["likes"]) > parseInt(maxx["likes"]))
        maxx = blogs[i]
    }
    return(
      {
        title: maxx.title,
        author: maxx.author,
        likes: maxx.likes
      }
    )
}

const mostBlogs = (blogs) =>{
  blogCount = {}

  blogs.forEach(blog => { // (author: amount of blogs)
    const author = blog.author

    if(blogCount[author]){
      blogCount[author] += 1 // if same author +1
    }else{
      blogCount[author] = 1 // otherwise just 1 blog
    }
  })
  // { 'Michael Chan': 1, 'Edsger W. Dijkstra': 2, 'Robert C. Martin': 3 }
  console.log(blogCount)
  
  let maxBlogs = 0
  let maxAuthor = ''

  for (const author in blogCount) { // loop through blogCount and find the author with most blogs
    if(blogCount[author] > maxBlogs) {
      maxBlogs = blogCount[author]
      maxAuthor = author
    }
  }
 
  return(
    {
      author: maxAuthor,
      blogs: maxBlogs
    }
  )
}

  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }