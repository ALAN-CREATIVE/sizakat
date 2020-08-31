import React from 'react';
import { Container, Title, Header } from './TableStyle';
import Button from '../Buttons/Button';
import Search from '../Searches/Search';
import CardList from '../Cards/CardList';
import Filter from '../Filters/Filter';

const Table = ({
  title,
  buttonCaption,
  filterCaption,
  filterOptions,
  searchPlaceholder,
  itemList,
  detailPath,
  onButtonClicked,
  onFilterPicked,
  onSearchChanged
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
        <Search
          placeholder={searchPlaceholder}
          onChange={onSearchChanged}
        />
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
          path={detailPath}
        />
      </div>
    </Container>
  );
};

export default Table;
