import React, { useState } from 'react';
import { FilterStyle } from './FilterStyle';

const Filter = ({label, options, error, onRadioClicked}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnChange = (event) => {
    onRadioClicked(event.target.value);
  }

  return (
    <div className='filter'>
      <FilterStyle />
      <div onClick={() => setIsOpen(isOpen ? false : true)}>
        <div>
          { label }
          <img style={{verticalAlign: 'baseline'}} src="/dropdown-arrow.svg" />
        </div>
        <div className={`kotakFilter ${isOpen ? '': 'hide'}`}>
          <div className="radios" onChange={handleOnChange}>
            {options.map(option => (
              <div className="radio" key={option} >
                <label style={{display: 'block'}}>
                  <input name="filter" type="radio" value={option} key={`input-${option}`} />
                  { option }
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
