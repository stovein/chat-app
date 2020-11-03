import React from 'react';
import InputArea from './InputArea';
import SubmitButton from './SubmitButton';

export default function UsernameScreen({ name, handleNameChange, handleScreenChange }) {
    
    const handleEnterSend = (e) => {
        if (e.key === "Enter" || e.key === "NumpadEnter") {
            handleScreenChange();
        }
    }
    
    return (
        <div>
            <InputArea 
                value={name}
                handleChange={handleNameChange}
                placeholder={'Your Name'}
                handleEnterSend={handleEnterSend}
            />
            <SubmitButton handleClick={() => handleScreenChange()} />  
        </div>
    )
}