import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ApolloProvider } from "@apollo/client"
import apolloclient from "./apolloclient"

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={apolloclient}>
    <App />
  </ApolloProvider>
)
