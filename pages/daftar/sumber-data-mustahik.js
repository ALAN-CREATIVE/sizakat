import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { ApolloProvider, ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';

import Navbar from '../../components/NavigationBar/NavigationBar';
import TitleBar from '../../components/Titles/TitleBar';
import Table from '../../components/Tables/Table';
import { toCapitalCase } from '../../Utils/StringUtil';
import { resolveDataSourceName } from '../../Utils/ParserUtil';

const INITIAL_DATA_SOURCES_QUERY = gql`
  query {
    dataSources {
      id
      category
      dataSourceDetail {
        ... on DataSourceWargaType {
          rt
          rw
          village
        }
        ... on DataSourceInstitusiType {
          name
          village
        }
        ... on DataSourcePekerjaType {
          profession
          location
        }
      }
    }
  }
`

const Container = styled.div`
  display: flex;
`

const Nav = styled.nav`
  margin-right: 30px;
  position: fixed;
`

const Main = styled.div`
  flex-grow: 4;
  margin: 0px 60px 0px 270px;
  height: 100%;
`

const Title = styled.div`
  margin: 20px 0px;
`

const TableContainer = styled.div`
`

const dataSourcesToCardItem = (dataSource) => {
  return {
    id: dataSource.id,
    desc: toCapitalCase(dataSource.category),
    label: resolveDataSourceName(dataSource)
  };
}

const MainContent = () => {
  const { loading, error, data } = useQuery(INITIAL_DATA_SOURCES_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>error</p>
  }
  return (
    <Container>
      <Nav>
        <Navbar
          name={'Annisaa Fitri Shabrina'}
          role={'Admin'}
          menu={'Mustahik'}
          submenu={[
            'Data Mustahik',
            'Sumber Data Mustahik'
          ]}
          onMenuClicked={(item) => console.log(item)}
        />
      </Nav>
      <Main>
        <Title>
          <TitleBar
            title={'Daftar Sumber Data Mustahik'}
            path={'Mustahik //'}
            current={'Sumber Data Mustahik'}
          />
        </Title>
        <TableContainer>
          {data && data.dataSources && <Table
            title={'Sumber Data Mustahik'}
            buttonCaption={'Tambah Sumber Data'}
            searchPlaceholder={'Cari berdasarkan nama sumber data'}
            filterCaption={'SEMUA KATEGORI DATA'}
            filterOptions={['Semua Kategori Sumber Data', 'Warga', 'Pesantren', 'Pekerja']}
            itemList={data.dataSources.map(dataSourcesToCardItem)}
            onCardDetailClicked={(id) => console.log(id)}

          />}
        </TableContainer>
      </Main>
    </Container>
  );
}

export default function SumberDataMustahik({ backend_uri }) {
  const client = new ApolloClient({
    uri: backend_uri,
    cache: new InMemoryCache()
  });
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Daftar Sumber Data Mustahik</title>
      </Head>
      <main>
        <MainContent />
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
