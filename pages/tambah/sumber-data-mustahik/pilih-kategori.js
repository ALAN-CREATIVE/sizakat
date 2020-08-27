import Head from 'next/head'
import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import styled from 'styled-components';

import PilihKategori from '../../../components/TambahSumberDataMustahik/PilihKategori';
import Navbar from '../../../components/NavigationBar/NavBarWithRouter';
import TitleBar from '../../../components/Titles/TitleBar';

import { PilihKategoriStyle } from '../../../components/TambahSumberDataMustahik/PilihKategoriStyle';

const Logout = styled.p`
  float: right;
  font-family: Muli, sans-serif;

  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 25px;

  margin: 3% 2% 2% 0;

  color: #EB4E2C;
`

function App({ backend_uri }) {
    const client = new ApolloClient({
        uri: backend_uri,
        cache: new InMemoryCache()
    });

    return (
    <ApolloProvider client={client}>
        <div className="PilihKategoriSumber">
            <Head>
                <title>Pilih Kategori Sumber</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous" />
                <link href="https://fonts.googleapis.com/css?family=Muli:300,400,700,800" rel="stylesheet" />
            </Head>

            <main>
                <div className="row">
                    <div className="col-3">
                        <Navbar
                            user={{
                                name: 'Annisaa Fitri Shabrina',
                                role: 'ADMIN'
                            }}
                        />
                    </div>
                    <div class="col-9">
                        <div className="row">
                            <div className="col">
                                <Logout>Keluar</Logout>
                            </div>
                        </div>
                        <TitleBar
                            title={'Tambah Sumber Data Mustahik'}
                            path={'Mustahik // '}
                            current={'Tambah Sumber'}
                        />
                        <div style={{ marginTop: '30px' }}>
                        <PilihKategori />
                        </div>

                    </div>
                </div>
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
            </main>
            <PilihKategoriStyle />
        </div>
    </ApolloProvider>
);
}

export default App;
