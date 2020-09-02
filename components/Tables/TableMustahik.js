import React from 'react';
import { Container, Title, Header } from './TableStyle';
import Button from '../Buttons/Button';
import {MustahikSearch} from '../Searches/MustahikSearch';
import CardList from '../Cards/CardList';
import Filter from '../Filters/Filter';

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
      <MustahikSearch 
        setMustahikData={
          setMustahikData
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
          path={detailPath}
        />
      </div>
    </Container>
  );
};

export default Table;
