import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import apolloclient from "./apolloclient"
import { ApolloProvider } from "@apollo/client"

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={apolloclient}>
    <App />
  </ApolloProvider>
)
