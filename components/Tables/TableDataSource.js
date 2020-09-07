import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container, Title, Header, TambahButton } from './TableStyle';
import { gql, useLazyQuery } from '@apollo/client'
import PropTypes from 'prop-types';
import {DataSourceSearch} from '../Searches/DataSourceSearch';
import CardList from '../Cards/CardList';
import Filter from '../Filters/Filter';

const SEARCH_QUERY = gql`
query dataSources($picNameContains: String, $category: String) {
    dataSources(picNameContains: $picNameContains, category: $category) {
      id
      category
      dataSourceDetail {
        __typename
        ... on DataSourceInstitusiType {
          picName
          name
          village
        }
        ... on DataSourcePekerjaType {
          picName
          profession
          location
        }
        ... on DataSourceWargaType {
          picName
          rt
          rw
          village
        }
      }
    }
  }
`;

const Table = ({
  title,
  buttonCaption,
  itemList,
  onButtonClicked,
  detailPath,
  setDataSourceData
}) => {
  const [picNameContains, setPicNameContains] = useState('');
  const [category, setCategory] = useState('');

  const [searchDataSource] = useLazyQuery(
    SEARCH_QUERY, {
      onCompleted: (data) => {
        setDataSourceData(data.dataSources)
      },
      onError: (error) => {
        console.log(error);
        console.log(error.networkError?.result?.errors);
        console.log(error.graphQLErrors);
      }
    }
  );

  useEffect(() => {
    searchDataSource({variables: {picNameContains, category}});
  }, [picNameContains, category])

  return (
    <Container>
      <Header>
        <Title>{ title }</Title>
        <Link href="/tambah/sumber-data-mustahik/pilih-kategori" passHref>
          <TambahButton>
            + Tambah Sumber Data
          </TambahButton>
        </Link>
      </Header>
      <div
        style={{
          margin: '30px 0px',
          position: 'relative'
        }}
      >
        <DataSourceSearch 
          setPicNameContains={setPicNameContains}
        />
        <div
          style={{
            position: 'absolute',
            top: '15px',
            right: '10px'
          }}
        >
          <Filter
            label={'SEMUA KATEGORI DATA'}
            onRadioClicked={(category) => {
              if (category === 'ALL') setCategory('');
              else setCategory(category);
            }}
            options={[
              {display: 'Semua Kategori Sumber Data', value: 'ALL'},
              {display: 'Warga', value: 'WARGA'},
              {display: 'Institusi', value: 'INSTITUSI'},
              {display: 'Pekerja', value: 'PEKERJA'}
            ]}
          />
        </div>
      </div>
      <div>
        <CardList
          list={itemList}
          path={detailPath}
        />
      </div>
    </Container>
  );
};

export default Table;

Table.propTypes = {
  title: PropTypes.string.isRequired,
  buttonCaption: PropTypes.string.isRequired,
  itemList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]).isRequired
    })
  ),
  onButtonClicked: PropTypes.func,
  detailPath: PropTypes.string,
  setDataSourceData: PropTypes.func
}
