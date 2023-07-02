import axios from 'axios'
const baseUrl = '/api/blogs'


const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

export default Blog