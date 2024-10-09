import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./services/connexion.ts";

import App from "./App.tsx";
import Detail from "./pages/Detail.tsx";

// import connexion from "./services/connexion.ts";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/detail/:id",
    element: <App />,
    // loader: async ({ params }) => {
    //   const repo = await connexion.get(`/api/repos/${params.id}`);
    //   return repo.data;
    // },
  },
  {
    path: "/adminstrateur/detail/:id",
    element: <Detail />,
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
