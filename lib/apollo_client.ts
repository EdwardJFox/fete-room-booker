import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.start.gg/gql/alpha",
  cache: new InMemoryCache(),
});

export default client;