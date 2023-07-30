import { gql } from "@apollo/client"

export const GetAuthors = gql`
  query {
    allAuthors {
      name
      bookCount
      born
    }
  }
`

export const GetBooks = gql`
  query AllBooks {
    allBooks {
      title
      author {
        name
        born
      }
      published
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const addBook = gql`
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

export const EditAuthor = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`
