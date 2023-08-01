import { gql } from "@apollo/client"

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    id
    name
    born
    bookCount
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    genres
    published
    author {
      id
      name
      born
      bookCount
    }
  }
`

export const GetAuthors = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const GetBooks = gql`
  query AllBooks {
    allBooks {
      title
      genres
      author {
        name
        born
        id
        bookCount
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
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const EditAuthor = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const userQuery = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const Book_Added = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
