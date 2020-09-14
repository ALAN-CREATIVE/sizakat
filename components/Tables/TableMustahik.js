import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { Container, Title, Header, TambahButton } from './TableStyle';
import Button from '../Buttons/Button';
import {MustahikSearch} from '../Searches/MustahikSearch';
import CardList from '../Cards/CardList';
import Filter from '../Filters/Filter';
import { resolveDataSourceName } from '../../utils/parser-util';

const SEARCH_QUERY = gql`
query mustahiks($nameContains: String, $dataSources: [ID]) {
  mustahiks(nameContains: $nameContains, dataSources: $dataSources) {
    id
    name
    dataSource {
      category
      dataSourceDetail {
        ... on DataSourceWargaType {
          village
          rt
          rw
        }
        ... on DataSourceInstitusiType {
          name
          village
          rt
          rw
        }
        ... on DataSourcePekerjaType {
          profession
          location
        }
      }
    }
  }
}
`;

const GET_DATA_SOURCE = gql`
query {
    dataSources {
        id
        category
        dataSourceDetail {
            ... on DataSourceWargaType {
            picName
            rt
            rw
            village
            }
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
        }
    }
}
`;

const Table = ({
  title,
  buttonCaption,
  filterCaption,
  filterOptions,
  detailPath,
  searchPlaceholder,
  itemList,
  onButtonClicked,
  onFilterPicked,
  onSearchChanged,
  setMustahikData
}) => {
  const [nameContains, setNameContains] = useState('');
  const [dataSources, setDataSources] = useState([]);

  const[searchMustahik] = useLazyQuery(
    SEARCH_QUERY, {
      onCompleted: (data) => {
        setMustahikData(data)
        console.log(data.dataSources)
      },
      onError: (error) => {
        console.log(error);
        console.log(error.networokError?.result?.errors);
        console.log(error.graphQLErrors);
      }
    }
  );

  const { data: dataSource, error: errorDataSource, loading: loadingDataSource } = useQuery(GET_DATA_SOURCE);

  useEffect(() => {
    searchMustahik({variables: {nameContains, dataSources}});
  }, [nameContains, dataSources])

  console.log(dataSources);
  
  if(errorDataSource) {
    console.log(errorDataSource);
    return <p>error</p>
  }
  if (loadingDataSource) return <p>loading ...</p>

  console.log(itemList);

  return (
    <Container>
      <Header>
        <Title>{ title }</Title>
        <Link href="/tambah/mustahik" passHref>
          <TambahButton>
            + Tambah Mustahik
          </TambahButton>
        </Link>
      </Header>
        <div
          style={{
            margin: '30px 0px',
            position: 'relative'
          }}
        >
          <MustahikSearch 
            setMustahikData={setMustahikData}
          />
          <div
            style={{
              position: 'absolute',
              top: '15px',
              right: '10px'
            }}
          >
          <Filter
            label={'SEMUA SUMBER DATA'}
            onRadioClicked={(dataSources) => {
              if (dataSources === 'ALL') setDataSources([]);
              else setDataSources([dataSources]);
            }}
            options={[
              {display: 'Semua Kategori Sumber Data', value: 'ALL'},
              ...dataSource.dataSources.map(dataSource => ({
                display: resolveDataSourceName(dataSource),
                value: dataSource.id
              }))
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
  setMustahikData: PropTypes.func
}
