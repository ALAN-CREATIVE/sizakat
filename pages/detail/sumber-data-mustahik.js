import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ApolloClient } from '@apollo/client';
import { ApolloProvider, gql } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { DetailInfo } from '../.././components/DetailSumberDataMustahik/Detail';
import { Container } from '../.././components/DetailSumberDataMustahik/DetailStyle';
import Navbar from '../.././components/NavigationBar/NavBarWithRouter';
import Button from '../.././components/Buttons/Button';
import TitleBar from '../.././components/Titles/TitleBar'
import DeleteWarning from '../../components/Popups/Warning';

export default function SumberDataMustahik({ backend_uri }) {

  const client = new ApolloClient({
    uri: backend_uri,
    cache: new InMemoryCache()
  });

  const router = useRouter();
  const { id } = router.query;
  const [warning, setWarning] = useState(false);
  const [category, setCategory] = useState('');
  const deleteDataSource = () => {
    client.mutate({
      mutation: gql`
        mutation DeleteDataSource {
          deleteDataSource(id: ${id}) {
            deleted
          }
        }
      `
    })
    .then(result => {
      if (result.data.deleteDataSource.deleted) {
        alert('sumber data telah dihapus');
        router.push('/daftar/sumber-data-mustahik');
      }
    })
  }

  return (
    <ApolloProvider client={client}>
      <Head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous"></link>
        <link href="https://fonts.googleapis.com/css?family=Muli:300,400,700,800" rel="stylesheet" />
        <title>Detail Mustahik</title>
      </Head>
      <main>
        <Container>
          {warning && (
            <DeleteWarning
              message={'Apakah anda yakin ingin menghapus sumber data ini?'}
              onReject={() => setWarning(false)}
              onConfirm={deleteDataSource}
            />
          )}
          <div className="row">
            <div className="col-3"></div>
            <div className="position-fixed col-3">
              <Navbar
                user={{
                  name: 'Annisaa Fitri Shabrina',
                  role: 'ADMIN'
                }}
              />
            </div>
            <div className="col-9" style={{marginTop: '20px'}}>
              <div className="row justify-content-between">
                <div className="col-5">
                  <TitleBar
                    title='Detail Sumber Data'
                    path='Mustahik //'
                    current='Detail Sumber Data Mustahik'
                  />
                </div>
                <div className="col-4 align-self-end">
                  <div className="row">
                    <div className="col-3">
                      <Button
                        label='Hapus'
                        type='danger'
                        onClick={() => setWarning(true)}
                      />
                    </div>
                    <div className="col-2">
                      <Button
                        label='Ubah'
                        type='primary'
                        onClick={() => {
                          let link = '/ubah/sumber-data-mustahik/';
                          switch(category) {
                            case 'PEKERJA':
                              link += 'pekerja';
                              break;
                            case 'INSTITUSI':
                              link += 'institusi';
                              break;
                            case 'WARGA':
                              link += 'warga';
                              break;
                          }
                          router.push({
                            pathname: link,
                            query: {id}
                          })
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <br></br>
              <DetailInfo setCategory={setCategory}/>
            </div>
          </div>
        </Container>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossOrigin="anonymous"></script>
      </main>
    </ApolloProvider>
  )
}

export async function getStaticProps() {
  return {
    props: {
      backend_uri: `http://${process.env.GRAPHQL_URL}`
    }
  }
}
