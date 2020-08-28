import React, { useState } from 'react';
import { InputStyle, SelectStyle } from './InputStyle';


export const Select = ({ placeholder, options, onSelect, defaultValue }) => {
  const [selectValue, setSelectValue] = useState(defaultValue ? defaultValue : placeholder);
  const [haveChosen, setHaveChosen] = useState(defaultValue ? true : false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{position: 'relative'}}>
      <div className={"header " + (haveChosen ? 'chosen' : '')} onClick={() => setIsOpen( isOpen ? false : true )}>
        <div style={{display: 'inline'}}>{ selectValue }</div>
        <img src="/dropdown-arrow.svg" />
      </div>
      {isOpen && <ul className="options">
        {options.map(option => (
          <li className="option" key={option} onClick={() => {
            setSelectValue(option.display);
            setHaveChosen(true);
            setIsOpen(false);
            onSelect(option.value);
          }}>{ option.display }</li>
        ))}
      </ul>}
      <SelectStyle />
    </div>
  )
}

const Dropdown = ({ label, placeholder, options, required, error, onChange, isOpen, defaultValue }) => {

  return (
    <div>
      <InputStyle />
      <label className={required ? 'required': ''}>{ label }</label>
      <Select placeholder={ placeholder } options={ options } onSelect={ onChange } isOpen={isOpen} defaultValue={defaultValue} />
      { error && <span className="error">{ error }</span> }
    </div>
  )
}

export default Dropdown;
