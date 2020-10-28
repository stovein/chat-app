import React, { useState, useEffect } from 'react';
import aes256 from 'aes256';

export default function SendArea(props) {
    const [ message, setMessage ] = useState('');
    const { socket, name, room, edch, publicKey } = props;
    

    useEffect(() => {
        socket.emit('joinPrivateChat', (room.id))    
    }, [])

    const handleEnterSend = (e) => {
        if (e.key === "Enter" || e.key === "NumpadEnter") {
            handleClick();
        }
    }

    const handleClick = () => {
        const data = {
            room_id: room.id,
            sender: name,
            key: '',
            message: message, //aes256.encrypt(key, message),
            date: new Date(),
        }
        socket.emit('chat', data);
        setMessage('');
    }
    
    return (
        <div>
            <input 
                style={{width: '100%'}} 
                type='text' 
                onChange={ (e) => setMessage(e.target.value) } 
                value={message} 
                placeholder='message'
                onKeyDown={handleEnterSend}>
            </input>
            <button 
                style={style} 
                type='submit' 
                onClick={handleClick}> 
                Gönder 
            </button>    
        </div>
    )
}

const style = {
    display: "block",
    width: '100%',
    border: "none",
    borderRadius: "10%",
    backgroundColor: "#4CAF50",
    padding: "14px 28px",
    textAlign: "center",
}
