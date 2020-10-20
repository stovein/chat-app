import React, { useState, useEffect } from 'react';
import aes256 from 'aes256';

export default function SendArea(props) {
    const [ message, setMessage ] = useState('');
    const { socket, name, room, edch, key } = props;
    

    useEffect(() => {
        socket.emit('joinPrivateChat', ({sender:name, reciever: room.id}))    
    }, [room])

    useEffect(() => {
        socket.on('allOnline', (isAllOnline) => {
            console.log(isAllOnline)
            if (isAllOnline) {
                socket.emit('setKeys', (edch.getPublicKey()));

                socket.on('getKeys', (publicKey) => {
                    console.log('got my key');
                    props.handleOtherKey(edch.computeSecret(publicKey).toString('hex'))
                })
            }
        })
        
    })

    const handleClick = () => {
        const data = {
            user: name,
            text: aes256.encrypt(key, message),
            timestamp: new Date(),
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
                placeholder='message'>
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
