import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const addLike = (content) => {
  return async (dispatch) => {
    const updatedContent = { ...content, votes: content.votes + 1 }
    await blogService.update(updatedContent)
    const updated = await blogService.getAll()
    dispatch(setBlogs(updated))
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await blogService.getAll()
    dispatch(setBlogs(anecdotes))
  }
}

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newBlogObject = await blogService.create(content)
    dispatch(appendBlog(newBlogObject))
  }
}

export const { createBlog, appendBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer
