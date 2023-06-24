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
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }