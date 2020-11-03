import React, { useState, useEffect } from 'react';
import InputArea from './InputArea';
import SubmitButton from './SubmitButton';
import aes256 from 'aes256';

export default function SendArea({ socket, name, room, edch, publicKey }) {
    const [ message, setMessage ] = useState('');   

    useEffect(() => {
        socket.emit('joinPrivateChat', (room.id))    
    }, [])

    const handleEnterSend = (e) => {
        if (e.key === "Enter" || e.key === "NumpadEnter") {
            handleClick();
        }
    }

    const handleChange = (e) => {
        setMessage(e.target.value);
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
            <InputArea 
                value={message}
                handleChange={handleChange}
                placeholder={'Your Message'}
                handleEnterSend={handleEnterSend}
            />
            <SubmitButton handleClick={handleClick} />
        </div>
    )
}
