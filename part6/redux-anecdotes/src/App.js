import { useSelector, useDispatch } from 'react-redux'
import { addLike, createAnecdote } from './reducers/anecdoteReducer'
import NewAnecdote from './components/AnecdoteForm'


const App = () => {
  const anecdotes = useSelector(state => state)
  const sortedAnecdotes = [...anecdotes].sort((a , b) => b.votes - a.votes)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(addLike(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <NewAnecdote />
    </div>
  )
}

export default App