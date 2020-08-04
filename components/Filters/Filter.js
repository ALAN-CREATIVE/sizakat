import React, { useState } from 'react';
import { FilterStyle } from './FilterStyle';



const Filter = ({options,required,error,onRadioClicked}) => {
    // ini namanya statement
    const [isOpen, setIsOpen] = useState(false);
    const handleOnChange = (event) => {
        onRadioClicked(event.target.value);
    }
    const [isSelect, setSelect] = useState(null);

    return (
        <div className='filter'>
            <FilterStyle />
            <div onClick={() => setIsOpen(isOpen ? false : true)}>
            <p>SEMUA SUMBER DATA ⯆ </p>
                {isOpen &&
                    <div className='kotakFilter'>
                        <div className="radios" onChange={handleOnChange} >{options.map(option => (
                            <div className="radio" key={option} >
                                <input type="radio" value={option} key={`input-${option}`} />
                                <label >{ option }</label>
                            </div>
                        ))}</div>
                        { error && <span className="error">{ error }</span> }
                    </div>
                }
            </div>
            
        </div>
    );
}

export default Filter;
