import React from 'react';
import ButtonStyle from './ButtonStyle';

export default function Button ({ label, type, onClick}){
    return (
        <div>
            <ButtonStyle />
            <button className = {type} onClick={onClick}>{label}</button>
        </div>
    );
}
