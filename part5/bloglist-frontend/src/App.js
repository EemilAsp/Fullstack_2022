import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [alertmessage, setAlertMessage] = useState([])
  const [type, setType] = useState('')
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const addNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    try{
    blogService.create(blogObject)
    .then(returnedBlog => {
    setBlogs(blogs.concat(returnedBlog))
    setType('note')
    setAlertMessage( `A new blog has been added: ${blogObject.title} by ${blogObject.author}`)
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    })
    }catch(exception){
      setType('error')
      setAlertMessage('Error while adding a blog')
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)
    }
  }

  const logoutUser = async (event) =>{
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    console.log("logged out")
  }

  const addBlogForm = () =>(
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addNewBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)} 
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)} 
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)} 
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );


  const loginForm = () =>(
    <div>
        <h2>Log in to application</h2>
        <form onSubmit={loginFunction}>
            <div>
              username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
    </div>
  )

  const blogDisplay = () =>(
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

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
      {user && addBlogForm()}
      </div>
      <h2>blogs</h2>
      <div>
      {user && blogDisplay()}
      </div>
    </div>
  )
}

export default App