import React, {useState} from 'react'


const Blog = ({blog, addLike, removeBlog}) => {

          const [showInfo, setInfo] = useState(false)
          const hideWhenVisible = { display: showInfo ? 'none' : '' }
          const showWhenVisible = { display: showInfo ? '' : 'none' }

          const blogStyle = {
            paddingTop: 10,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 5
          }
          

          return(
            <div style={blogStyle}>
              <div style={hideWhenVisible}> 
                {blog.title} {blog.author}
                <button onClick={() => setInfo(true)}>show</button>
              </div>
              <div style={showWhenVisible}>
                <p>{blog.title} {blog.author} 
                <button onClick={() => setInfo(false)}>hide</button>
                </p>
                <p>{blog.url}</p>
                <p>{blog.likes}
                <button onClick={() => addLike(blog)}>Like</button></p>
                <p>{blog.user.name}</p>
                <button onClick={() => removeBlog(blog)}>Remove</button>
              </div>
            </div>
            )
}

export default Blog