import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CountryDetails from "./components/CountryDetails";
import CountryList from "./components/CountryList";

const client = new ApolloClient({
  uri: "https://graphql.country/graphql",
  cache: new InMemoryCache(),
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <CountryList />,
    // errorElement: <NotFound />,
  },
  {
    path: "/country/:code",
    element: <CountryDetails />,
  },
]);
const App = () => (
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);

export default App;
