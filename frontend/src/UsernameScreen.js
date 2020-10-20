import React from 'react';

export default function UsernameScreen(props) {
    const { name, handleNameChange, handleScreenChange } = props;

    const style = {
        display: "block",
        width: '100%',
        border: "none",
        borderRadius: "10%",
        backgroundColor: "#4CAF50",
        padding: "14px 28px",
        textAlign: "center",
      }
    
    return (
        <div>
            <input style={{width: '100%'}} type='text' onChange={(e) => handleNameChange(e.target.value)} value={name} placeholder='name'></input>
            <button style={style} type='submit' onClick={() => handleScreenChange()}>Gönder</button>    
        </div>
    )
}
