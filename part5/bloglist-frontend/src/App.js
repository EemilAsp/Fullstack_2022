import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [alertmessage, setAlertMessage] = useState([])
  const [type, setType] = useState('')

  useEffect(() => {
    const loggedUserJsonObject = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJsonObject) {
      const user = JSON.parse(loggedUserJsonObject)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const blogFormReference = useRef()

  const loginFunction = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(exception) {
      setType('error')
      setAlertMessage('Invalid credentials')
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const addNewBlog = (newBlogObject) => {
    blogFormReference.current.toggleVisibility()
    try{
    blogService.create(newBlogObject)
    blogService.getAll().then(blogs => {
    setBlogs( blogs )
    setType('note')
    setAlertMessage( `A new blog has been added: ${newBlogObject.title} by ${newBlogObject.author}`)
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)
    })
    }catch(exception){
      setType('error')
      setAlertMessage('Error while adding a blog')
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)
    }
  }

  const addLike = async (blog) => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    await blogService.update(updatedBlog)
    const updatedList = await blogService.getAll()
    setBlogs(updatedList)
  }

  const removeBlog = async (blog) => {
    if(window.confirm(`Remove blog ${blog.name} by ${blog.author}`)){
    await blogService.remove(blog)
    const updatedList = await blogService.getAll()
    setBlogs(updatedList)
    }
  }

  const logoutUser = async (event) =>{
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    console.log("logged out")
  }

  const loginForm = () =>{
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return(
      <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>log in</button>
      </div>
      <div style={showWhenVisible}>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={loginFunction}
        />
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
    </div>
    )
  }

  const blogDisplay = () =>{
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
    return(
    <div>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} />
      )}
    </div>
  )}

  return (
    <div>
      <h1>Blog application</h1>
      <Notification message={alertmessage} type={type}/>
      <div>
      {!user && loginForm()}
      </div>
      {user &&
      <div> <p>{user.name} logged in  
            <button onClick={logoutUser}>Logout</button>
      </p>
      </div>}
      <div>
      {user &&
      <Toggleable buttonLabel="Add blog" ref={blogFormReference}>
      <BlogForm addNewBlog={addNewBlog}/>
      </Toggleable>}
      </div>
      <h2>blogs</h2>
      <div>
      {user && blogDisplay()}
      </div>
    </div>
  )
}

export default App