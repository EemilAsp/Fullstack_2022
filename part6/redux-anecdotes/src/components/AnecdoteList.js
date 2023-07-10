import { useSelector, useDispatch } from 'react-redux'
import { addLike } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const sortedAnecdotes = [...anecdotes].sort((a , b) => b.votes - a.votes)
    const dispatch = useDispatch()

    return (
        <div>
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
        </div> 
    )
}

export default AnecdoteList