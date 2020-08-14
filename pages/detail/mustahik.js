import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import {DetailInfo} from '../../components/DetailMustahik/Detail';
import {DetailStyle} from '../../components/DetailMustahik/DetailStyle';
import Navbar from '../.././components/NavigationBar/NavBarWithRouter';

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
      <div>
        <DetailStyle />
        <div className="row">
          <div className="col-3">
            <Navbar
              user={{
                name: 'Annisaa Fitri Shabrina',
                role: 'ADMIN'
              }}
            />
          </div>
          <div className="col-9">
            <div className="row justify-content-end">
                <div className="col-2">
                    <p className="out"><a href="/">Keluar</a></p>
                </div>
            </div>
            <DetailInfo/>
          </div>
        </div>
      </div>
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossOrigin="anonymous"></script>
    </main>
  </ApolloProvider>
);
export default App;
