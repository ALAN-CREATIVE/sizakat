import React from 'react';
import { Container, Title, Header } from './TableStyle';
import Button from '../Buttons/Button';
import {DataSourceSearch} from '../Searches/DataSourceSearch';
import CardList from '../Cards/CardList';
import Filter from '../Filters/Filter';

const Table = ({
  title,
  buttonCaption,
  filterCaption,
  filterOptions,
  searchPlaceholder,
  itemList,
  onButtonClicked,
  onFilterPicked,
  onDetailClicked,
  onSearchChanged,
  setDataSourceData,
}) => {
  return (
    <Container>
      <Header>
        <Title>{ title }</Title>
        <Button 
          type={'primary'} 
          label={`+ ${buttonCaption}`} 
          onClick={onButtonClicked} 
        />
      </Header>
      <div style={{ margin: '30px 0px' }}>
      <DataSourceSearch 
        setDataSourceData={
          setDataSourceData
        }/>
        <div>
          <Filter
            label={filterCaption}
            onRadioClicked={onFilterPicked}
            options={filterOptions}
          />
        </div>
      </div>
      <div>
        <CardList
          list={itemList}
          onCardDetailClicked={onDetailClicked}
        />
      </div>
    </Container>
  );
};

export default Table;
