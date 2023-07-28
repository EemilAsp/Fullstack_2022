const { GraphQLError } = require("graphql")

const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
require("dotenv").config()
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const MONGODB_URI = process.env.MONGODB_URI
console.log(MONGODB_URI)
const jwt = require("jsonwebtoken")

const Author = require("./models/authors")
const Book = require("./models/books")
const User = require("./models/users")

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

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
  bookCount: Int!
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

const resolvers = {
  Book: {
    author: async (root) => {
      // Author works in allBooks
      const author = await Author.findById(root.author)
      return author
    },
  },
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      //Allbooks work with filters
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        const allbooks = await Book.find({
          author: author._id,
          genres: args.genre,
        })
        return allbooks
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author })
        const allbooks = await Book.find({
          author: author._id,
        })
        return allbooks
      } else if (args.genre) {
        const allbooks = await Book.find({
          genres: args.genre,
        })
        return allbooks
      } else {
        const allbooks = await Book.find({})
        return allbooks
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const allauthors = await authors.map((author) => {
        bookCount = Book.collection.countDocuments({ author: author._id })
        return {
          name: author.name,
          bookCount: bookCount,
          born: author.born,
          id: author.id,
        }
      })
      return allauthors
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })
      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "salaisuus321") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    addBook: async (root, args, context) => {
      const currentauthor = await Author.findOne({ name: args.author })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      if (!currentauthor) {
        const newAuthor = new Author({
          name: args.author,
          born: null,
        })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new GraphQLError("Saving new author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          })
        }
      }

      const author = await Author.findOne({ name: args.author })

      const newBook = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id,
      })

      try {
        const book = await newBook.save()
        return book
      } catch (error) {
        throw new GraphQLError("Saving new book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: newBook.toString(),
            error,
          },
        })
      }
    },
    editAuthor: async (root, args, context) => {
      // edit author works
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      try {
        const author = await Author.findOne({ name: args.name })
        if (!author) {
          return null
        }
        author.born = args.setBornTo
        await author.save()
        return author
      } catch (error) {
        throw new GraphQLError("Editing author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        })
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
