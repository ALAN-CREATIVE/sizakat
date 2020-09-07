import Head from 'next/head';
import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { UbahSDMStyle } from '../../../../components/UbahSumberDataMustahik/UbahSDMStyle';
import FormUbahSDM from '../../../../components/UbahSumberDataMustahik/UbahSDMPekerja';
import NavigationBar from '../../../../components/NavigationBar/NavBarWithRouter';
import { TambahSDMContainer } from '../../../../components/TambahSumberDataMustahik/TambahSDMStyle';


function App({ backend_uri }) {
    const client = new ApolloClient({
        uri: backend_uri,
        cache: new InMemoryCache()
    });

    return (
    <ApolloProvider client={client}>
        <div className="TambahMustahikPage">
            <Head>
                <title>Edit SDM</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css?family=Muli:300,400,700,800" rel="stylesheet" />
            </Head>
            <TambahSDMContainer className="EditSDMPage">
            <main>
                <div class="row">
                    <div className="col-3" />
                    <div class="position-fixed col-3">
                        <NavigationBar
                            user={{
                              name: 'Annisaa Fitri Shabrina',
                              role: 'Admin'
                            }}
                        />
                    </div>
                    <div class="col-9">
                        <div className="row">
                            <div className="col">
                                <h1 id="logout">Keluar</h1>
                            </div>
                        </div>
                        <h1 id="page-title">Edit Sumber Data Mustahik</h1>
                        <p id="breadcrumb">Mustahik {'//'} <span>Edit Sumber {'//'}</span><span style={{ color: "#00239D" }}><b>Pekerja</b></span></p>
                        <FormUbahSDM />

                    </div>
                </div>
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossOrigin="anonymous"></script>
            </main>
            <UbahSDMStyle />
            </TambahSDMContainer>
        </div>
    </ApolloProvider>
);
}

export async function getStaticProps() {
    return {
      props: {
        backend_uri: `http://${process.env.GRAPHQL_URL}`
     
      }
    }
  }

export default App;
