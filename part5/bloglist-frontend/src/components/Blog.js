import React, { useState } from 'react'


const Blog = ({ blog, addLike, removeBlog, user }) => {

  const [showInfo, setInfo] = useState(false)
  const hideWhenVisible = { display: showInfo ? 'none' : '' }
  const showWhenVisible = { display: showInfo ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const noBullets = { //format list
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  }

  const removeBtnRenderer = () => {
    if(blog.user.username === user.username){
      return(
        <button id='removebtn' onClick={() => removeBlog(blog)}>
          Remove
        </button>
      )
    }
    return null
  }

  return (
    <div className='blog' style={blogStyle}>
      <div style={hideWhenVisible}>
        <p>{blog.title}</p>
        <p>{blog.author}</p>
        <button id='showbtn' onClick={() => setInfo(true)}>show</button>
      </div>
      <div style={showWhenVisible}>
        <ul style={noBullets}>
          <li>{blog.title} {blog.author}
            <button id='hidebtn' onClick={() => setInfo(false)}>hide</button>
          </li>
          <li>{blog.url}</li>
          <li>{blog.likes}
            <button id='likebtn' onClick={() => addLike(blog)}>Like</button></li>
          <li>{blog.user.name}</li>
          { removeBtnRenderer() }
        </ul>
      </div>
    </div>
  )
}

export default Blog