import React from 'react';
import UsernameScreen from './UsernameScreen';

export default function selectUsernameScreen({ name, setName, setIsNameScreen }) {
    return (
        <div>
            <h4>Please enter your name:</h4>
            <UsernameScreen 
                name={name} 
                handleNameChange={(e) => setName(e.target.value)}
                handleScreenChange={() => setIsNameScreen(false)} 
            />
        </div>
    )
}
