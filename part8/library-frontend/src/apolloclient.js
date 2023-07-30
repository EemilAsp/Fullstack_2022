import { setContext } from "@apollo/client/link/context"
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("user-token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  }
})

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
})

const apolloclient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

export default apolloclient
