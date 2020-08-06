import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { MustahikSearch } from '../.././components/Searches/MustahikSearch';

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql/',
    cache: new InMemoryCache()
});

const App = () => (
    <ApolloProvider client={client}>
      <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous"></link>
        <link href="https://fonts.googleapis.com/css?family=Muli:300,400,700,800" rel="stylesheet" />
      </head>
      <main>
          <MustahikSearch setMustahikData={(data)=>console.log(data)}/>
      </main>
    </ApolloProvider>
  );
  export default App;