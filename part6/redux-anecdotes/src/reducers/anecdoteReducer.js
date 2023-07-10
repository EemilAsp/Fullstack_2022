import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({ // 6.12
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addLike(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote)
    }
  ,
  appendAnecdote(state,action) {
    state.push(action.payload)
  },
  setAnecdotes(state, action) {
    return action.payload
  }
},
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}


export const {createAnecdote, addLike, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer