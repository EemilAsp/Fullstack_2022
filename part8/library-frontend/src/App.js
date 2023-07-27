import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import { gql, useQuery, useMutation } from "@apollo/client"

const GetAuthors = gql`
  query {
    allAuthors {
      name
      bookCount
      born
    }
  }
`

const GetBooks = gql`
  query AllBooks {
    allBooks {
      title
      author
      published
    }
  }
`

const addBook = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      author
      genres
      id
      published
      title
    }
  }
`

const EditAuthor = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

const App = () => {
  const [page, setPage] = useState("authors")
  const result = useQuery(page === "authors" ? GetAuthors : GetBooks)
  const [createBook] = useMutation(addBook, {
    refetchQueries: [{ query: GetBooks }],
  })
  const [editAuthor] = useMutation(EditAuthor, {
    refetchQueries: [{ query: GetAuthors }],
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
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
