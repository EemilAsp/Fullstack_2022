const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")

require("dotenv").config()
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const MONGODB_URI = process.env.MONGODB_URI
console.log(MONGODB_URI)

const Author = require("./models/authors")
const Book = require("./models/books")

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

const typeDefs = `
type Query {
  authorCount: Int!
  allBooks(author: String, genre: String): [Book!]!
  bookCount: Int!
  allAuthors(born: YesNo): [Author!]!
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
    addBook: async (root, args) => {
      const currentauthor = await Author.findOne({ name: args.author })

      if (!currentauthor) {
        const newAuthor = new Author({
          name: args.author,
          born: null,
        })
        await newAuthor.save()
      }

      const author = await Author.findOne({ name: args.author })

      const newBook = new Book({
        ...args,
        author: author._id,
      })
      const res = await newBook.save()
      return res
    },
    editAuthor: async (root, args) => {
      // edit author works
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      await author.save()
      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
