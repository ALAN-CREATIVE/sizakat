import React from 'react';
import PropTypes from 'prop-types';
import { TitleListContainer, Title } from './TitleStyle';

const TitleFlow = ({ titleList, currentTitleIndex }) => {
  return (
    <TitleListContainer size={titleList.length}>
      {titleList.map((title, index) => (
        <Title key={index}>
          <p
            className={currentTitleIndex === index ? 'highlight' : ''}
          >
            { title }
          </p>
          {(index !== titleList.length-1) && <img src="/svg/gt-arrow.svg" />}
        </Title>
      ))}
    </TitleListContainer>
  )
}

export default TitleFlow;

TitleFlow.propTypes = {
  titleList: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentTitleIndex: PropTypes.number
}
