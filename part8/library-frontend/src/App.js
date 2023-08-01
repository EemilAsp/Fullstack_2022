import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Recommended from "./components/Recommended"
import {
  useQuery,
  useMutation,
  useApolloClient,
  useSubscription,
} from "@apollo/client"
import {
  EditAuthor,
  GetBooks,
  GetAuthors,
  userQuery,
  Book_Added,
} from "./queries"

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>
}

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const client = useApolloClient()
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors")

  const authors = useQuery(GetAuthors)
  const books = useQuery(GetBooks)
  const user = useQuery(userQuery)

  useSubscription(Book_Added, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      console.log(addedBook)
      notify(`${addedBook.title} added`)
      updateCache(client.cache, { query: GetBooks }, addedBook)
    },
  })

  const [editAuthor] = useMutation(EditAuthor, {
    refetchQueries: [{ query: GetAuthors }],
  })

  if (authors.loading || books.loading || user.loading) {
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
        <button onClick={() => setPage("recommended")}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === "authors"}
        authors={authors.data.allAuthors}
        editAuthor={editAuthor}
      />

      <Books show={page === "books"} books={books.data.allBooks} />

      <NewBook show={page === "add"} setError={notify} />

      <Recommended
        show={page === "recommended"}
        books={books.data.allBooks}
        favoriteGenre={user.data.me.favoriteGenre}
      />
    </div>
  )
}

export default App
