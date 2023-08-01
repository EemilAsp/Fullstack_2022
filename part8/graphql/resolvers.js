const { GraphQLError } = require("graphql")
const jwt = require("jsonwebtoken")
const Author = require("./models/authors")
const Book = require("./models/books")
const User = require("./models/users")
const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()

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
        const bookCount = Book.collection.countDocuments({ author: author._id })
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
        await newBook.save()
      } catch (error) {
        throw new GraphQLError("Saving new book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: newBook.toString(),
            error,
          },
        })
      }
      pubsub.publish("BOOK_ADDED", { bookAdded: newBook })
      return newBook
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
        return {
          name: author.name,
          bookCount: author.bookCount,
          born: author.born,
          id: author.id,
        }
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
}

module.exports = resolvers
