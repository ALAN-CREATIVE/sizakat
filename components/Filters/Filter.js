import React, { useState } from 'react';
import { FilterContainer } from './FilterStyle';

const Filter = ({label, options, onRadioClicked}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnChange = (event) => {
    setIsOpen(false);
    onRadioClicked(event.target.value);
  }

  return (
    <FilterContainer>
      <div onClick={() => setIsOpen(isOpen ? false : true)}>
        <div>
          { label }
          <img style={{verticalAlign: 'baseline'}} src="/dropdown-arrow.svg" />
        </div>
        <div className={`kotakFilter ${isOpen ? '': 'hide'}`}>
          <div className="radios" onChange={handleOnChange}>
            {options.map(option => (
              <div className="radio" key={option}>
                <label style={{display: 'block'}}>
                  <input name="filter" type="radio" value={option} key={`input-${option}`} />
                  { option }
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FilterContainer>
  );
}

export default Filter;
