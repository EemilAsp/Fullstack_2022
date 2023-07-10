import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({ // 6.12
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
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


export const {createAnecdote, addLike, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer