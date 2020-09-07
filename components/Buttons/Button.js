import React from 'react';
import ButtonContainer from './ButtonStyle';

export default function Button ({ label, type, onClick}){
    return (
        <ButtonContainer>
            <button className = {type} onClick={onClick}>{label}</button>
        </ButtonContainer>
    );
}
