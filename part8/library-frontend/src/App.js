import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import { useQuery, useMutation, useApolloClient } from "@apollo/client"
import { EditAuthor, GetBooks, GetAuthors, addBook } from "./queries"

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors")
  const result = useQuery(page === "authors" ? GetAuthors : GetBooks)
  const client = useApolloClient()
  const [createBook] = useMutation(addBook, {
    refetchQueries: [{ query: GetBooks }, { query: GetAuthors }],
  })
  const [editAuthor] = useMutation(EditAuthor, {
    refetchQueries: [{ query: GetAuthors }],
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === "authors"}
        authors={result.data.allAuthors}
        editAuthor={editAuthor}
      />

      <Books show={page === "books"} books={result.data.allBooks} />

      <NewBook show={page === "add"} createBook={createBook} />
    </div>
  )
}

export default App
