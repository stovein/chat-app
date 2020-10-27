import React, { useState } from 'react';
import UsernameScreen from './Components/UsernameScreen';
import SelectRoom from './Components/SelectRoom';
import './App.css';


export default function App() {
    const [ name, setName ] = useState('');
    const [ isNameScreen, setIsNameScreen ] = useState(true);

    const selectUsernameScreen = () =>  {
      return (
        <div>
          <h4>Please enter your name:</h4>
          <UsernameScreen 
              name={name} 
              handleNameChange={(value) => setName(value)}
              handleScreenChange={() => setIsNameScreen(false)} 
          />
        </div>
      )
    }

    const selectRoomScreen = () => {
      return (
        <SelectRoom
            name={name}
        />
      )
    }

    return (
      <div className='App'>
        <h1 style={{textAlign: 'center'}} >Chat App</h1>
        { isNameScreen ?  selectUsernameScreen() : selectRoomScreen()}
        
      </div>
    );
    
}