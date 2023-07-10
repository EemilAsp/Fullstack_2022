import NewAnecdote from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <AnecdoteList />
      <NewAnecdote />
    </div>
  )
}

export default App