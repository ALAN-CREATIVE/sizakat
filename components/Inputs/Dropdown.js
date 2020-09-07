import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { InputContainer, SelectContainer } from './InputStyle';

export const Select = ({
  placeholder,
  options,
  onSelect,
  align,
  defaultValue
}) => {
  const [selectValue, setSelectValue] = useState(defaultValue ? defaultValue : placeholder);
  const [haveChosen, setHaveChosen] = useState(defaultValue ? true : false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectContainer
      style={{position: 'relative'}}
      onBlur={() => {setIsOpen(false)}}
      tabIndex={0}
    >
      <div
        className={"header " + (haveChosen ? 'chosen' : '')}
        onClick={() => setIsOpen( isOpen ? false : true )}
      >
        <div style={{display: 'inline'}}>{ selectValue }</div>
        <img src="/dropdown-arrow.svg" />
      </div>
      {isOpen && <ul className="options">
        {options.map(option => (
          <li
            className="option"
            key={option.value}
            onClick={() => {
              setSelectValue(option.display);
              setHaveChosen(true);
              setIsOpen(false);
              onSelect(option.value);
            }}
            style={{textAlign: align}}
          >
            {option.display}
            <label>{option.note}</label>
          </li>
        ))}
      </ul>}
    </SelectContainer>
  )
}

const Dropdown = ({
  label,
  placeholder,
  options,
  required,
  error,
  onChange,
  defaultValue,
  align
}) => {

  return (
    <InputContainer>
      <label className={required ? 'required': ''}>{ label }</label>
      <Select
        placeholder={placeholder}
        options={options}
        onSelect={onChange}
        defaultValue={defaultValue}
        align={align}
      />
      { error && <span className="error">{ error }</span> }
    </InputContainer>
  )
}

export default Dropdown;

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      display: PropTypes.string.isRequired,
      note: PropTypes.string
    })
  ),
  required: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  align: PropTypes.string
}

Select.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      display: PropTypes.string.isRequired,
      note: PropTypes.string
    })
  ),
  onSelect: PropTypes.func.isRequired,
  align: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}
