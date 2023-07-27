import { ApolloClient, InMemoryCache } from "@apollo/client"

const apolloclient = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
})

export default apolloclient
