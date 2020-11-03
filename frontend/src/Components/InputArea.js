import React from 'react';

export default function InputArea({ handleChange, value, placeholder, handleEnterSend }) {
    return (
        <div>
            <input 
                style={{width: '100%'}} 
                type='text' 
                onChange={ handleChange } 
                value={value} 
                placeholder={placeholder}
                onKeyDown={handleEnterSend}>
            </input>
        </div>
    );

}