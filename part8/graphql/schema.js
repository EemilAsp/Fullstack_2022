const typeDefs = `
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}


type Query {
  authorCount: Int!
  allBooks(author: String, genre: String): [Book!]!
  bookCount: Int!
  allAuthors(born: YesNo): [Author!]!
  me: User
}

enum YesNo {
  YES
  NO
}

type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

type Author {
  name: String!
  bookCount: Int
  born: Int
  id: ID!
}

type Mutation {
  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  ): Book!

  editAuthor(
    name: String!
    setBornTo: Int!
  ): Author

  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}
`

module.exports = typeDefs
