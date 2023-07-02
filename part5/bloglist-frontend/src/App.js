import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [alertmessage, setAlertMessage] = useState([])

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
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(exception) {
      setAlertMessage('wrong credentials')
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)
    }


    console.log('logging in with', username, password)
  }


 

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
    <h2>blogs</h2>
      {user && <div>
        <p>{user.name} logged in</p>
        </div>}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <div>
      {!user && loginForm()}
      </div>
      <div>
      {user && blogDisplay()}
      </div>
    </div>
  )
}

export default App