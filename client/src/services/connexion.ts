// import axios from "axios";

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// export default instance;

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_API_URL, // URL de ton backend
    // credentials: "include", // Permet l'envoi des cookies avec les requêtes
  }),
  cache: new InMemoryCache(),
});

export default client;
