import Head from 'next/head'
import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

import FormTambahSDMPekerja from './content';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

import { TambahSDMPekerjaStyle } from './style';

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql/',
    cache: new InMemoryCache()
  });


function App() {
    return (
    <ApolloProvider client={client}>
        <div className="TambahSDMPekerja">
            <Head>
                <title>Tambah SDM Pekerja</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous" />
                <link href="https://fonts.googleapis.com/css?family=Muli:300,400,700,800" rel="stylesheet" />
            </Head>

            <main>
                <div className="row">
                    <div class="col-3">
                        <div className="navigation-bar">
                            <NavigationBar
                                name={'Annisaa Fitri Shabrina'}
                                role={'Admin'}
                                menu={'Mustahik'}
                                submenu={[
                                    'Data Mustahik',
                                    'Sumber Data Mustahik'
                                ]}
                                onMenuClicked={(item) => console.log(item)}
                            />
                        </div>
                    </div>
                    <div class="col-9">
                        <div className="row">
                            <div className="col">
                                <h1 id="logout">Keluar</h1>
                            </div>
                        </div>
                        <h1 id="page-title">Tambah Mustahik</h1>
                        <p id="breadcrumb">Mustahik {'>>'} <span>Tambah Mustahik</span></p>
                        <FormTambahSDMPekerja />

                    </div>
                </div>
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
            </main>
            <TambahSDMPekerjaStyle />
        </div>
    </ApolloProvider>
);
}

export default App;