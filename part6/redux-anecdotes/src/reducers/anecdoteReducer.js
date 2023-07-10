import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({ // 6.12
  name: 'anecdotes',
  initialState: [],
  reducers: {

  appendAnecdote(state,action) {
    state.push(action.payload)
  },
  setAnecdotes(state, action) {
    return action.payload
  }
},
})

export const addLike = (content) => {
  return async dispatch => {
    const updatedContent = { ...content, votes: content.votes + 1}
    await anecdoteService.update(updatedContent)
    const updated = await anecdoteService.getAll()
    dispatch(setAnecdotes(updated))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}


export const {createAnecdote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer