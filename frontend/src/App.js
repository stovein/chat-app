import React, { useState } from 'react';
import SelectUsernameScreen from './Components/SelectUsernameScreen';
import SelectRoom from './Components/SelectRoom';
import './App.css';


export default function App() {
    const [ name, setName ] = useState('');
    const [ isNameScreen, setIsNameScreen ] = useState(true);

    return (
      <div className='App'>
        <h1 style={{textAlign: 'center'}} >Chat App</h1>
        { isNameScreen ?  
          <SelectUsernameScreen name={ name } setName={ setName } setIsNameScreen={ setIsNameScreen } /> : 
          <SelectRoom name={name} />
        }
      </div>
    );
    
}

