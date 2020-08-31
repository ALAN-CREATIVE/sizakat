import React, { useState } from 'react';
import { InputContainer, SelectContainer } from './InputStyle';


export const Select = ({ placeholder, options, onSelect }) => {
  const [selectValue, setSelectValue] = useState(placeholder);
  const [haveChosen, setHaveChosen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectContainer style={{position: 'relative'}}>
      <div className={"header " + (haveChosen ? 'chosen' : '')} onClick={() => setIsOpen( isOpen ? false : true )}>
        <div style={{display: 'inline'}}>{ selectValue }</div>
        <img src="/dropdown-arrow.svg" />
      </div>
      {isOpen && <ul className="options">
        {options.map(option => (
          <li className="option" key={option.value} onClick={() => {
            setSelectValue(option.display);
            setHaveChosen(true);
            setIsOpen(false);
            onSelect(option.value);
          }}>{ option.display }</li>
        ))}
      </ul>}
    </SelectContainer>
  )
}

const Dropdown = ({ label, placeholder, options, required, error, onChange, isOpen }) => {

  return (
    <InputContainer>
      <label className={required ? 'required': ''}>{ label }</label>
      <Select placeholder={ placeholder } options={ options } onSelect={ onChange } isOpen={isOpen} />
      { error && <span className="error">{ error }</span> }
    </InputContainer>
  )
}

export default Dropdown;
