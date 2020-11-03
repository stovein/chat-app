import React, { useState, useEffect } from 'react';
import Message from './Message';
import aes256 from 'aes256';
//import Controller from '../Controllers/Controller';

export default function Messages({ socket, publicKey, room, sender }) {
    const [ messages, setMessages ] = useState([])

    useEffect( () => {
        socket.emit('requestAllMessages', {room_id: room.id, sender: sender});
        socket.on('chat', (data) => {
            //data.text = aes256.decrypt(key, data.text);

            // ilk mesaj yükleme
            if ( data.length ) {
                setMessages([...data]);
            }
            
            // diğer mesaj yüklemeler
            else if (data.length !== 0) {
                setMessages( m => [...m, data]);
            }
        })
    }, [])

    return (
        <div>
            {messages.map((message, i) => {
                return <Message {...message} key={'message' + i} />
            })}
        </div>
    )
}
