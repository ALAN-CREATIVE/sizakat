import React, { useState } from 'react';
import { InputStyle, SelectStyle } from './InputStyle';


export const Select = ({ placeholder, options, onSelect }) => {
  const [selectValue, setSelectValue] = useState(placeholder);
  const [haveChosen, setHaveChosen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{position: 'relative'}}>
      <div className={"header " + (haveChosen ? 'chosen' : '')} onClick={() => setIsOpen( isOpen ? false : true )}>
        <div style={{display: 'inline'}}>{ selectValue }</div>
        <img src="dropdown-arrow.svg" />
      </div>
      {isOpen && <ul className="options">
        {options.map(option => (
          <li className="option" key={option} onClick={() => {
            setSelectValue(option);
            setHaveChosen(true);
            setIsOpen(false);
            onSelect(option);
          }}>{ option }</li>
        ))}
      </ul>}
      <SelectStyle />
    </div>
  )
}

const Dropdown = ({ label, placeholder, options, required, error, onChange, isOpen }) => {

  return (
    <div>
      <InputStyle />
      <label className={required ? 'required': ''}>{ label }</label>
      <Select placeholder={ placeholder } options={ options } onSelect={ onChange } isOpen={isOpen} />
      { error && <span className="error">{ error }</span> }
    </div>
  )
}

export default Dropdown;
