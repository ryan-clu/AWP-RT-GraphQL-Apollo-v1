import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, useMutation } from '@apollo/client';
import DisplayData from "./DisplayData";

function App() {

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql"
  });

  return (
    <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">
        <p>
          Ryan's AWP project exploring GraphQL + Apollo Client + Apollo Server
        </p>
      </header>
      <div>
        <DisplayData />
      </div> 
    </div>
    </ApolloProvider>
  );
}

export default App;
