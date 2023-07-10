import { useSelector, useDispatch } from 'react-redux'
import { addLike } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    

    const anecdotes = useSelector(state => { // filtering anecdotes based on filter input
        if ( state.filter === null){
            console.log(state.anecdotes)
            return state.anecdotes
        }else{
            const filteredAnecdotes = 
                state.anecdotes.filter((anecdote =>
                anecdote.content.toLowerCase().includes(state.filter.toLowerCase())))
            return filteredAnecdotes
        }
    })

    const anecdotesSorted = [...anecdotes].sort((a , b) => b.votes - a.votes) // sorting
    const dispatch = useDispatch()

    const addVote = (anecdote) =>{
      dispatch(addLike(anecdote.id))
      dispatch(notificationChange(`Anecdote: "${anecdote.content}" has been liked`))
      setTimeout(() => dispatch(notificationChange(null)), 5000)
    }

    return (
        <div>
          {anecdotesSorted.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => addVote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div> 
    )
}

export default AnecdoteList