import React, { useState, useEffect } from 'react';
import Message from './Message';
import aes256 from 'aes256';

export default function Messages(props) {
    const [ messages, setMessages ] = useState([])
    let change = false
    const { socket, publicKey, room, sender } = props;

    useEffect( () => {
        socket.emit('requestAllMessages', {room_id: room.id, sender: sender});
    }, [])

    useEffect( () => {
        socket.on('chat', (data) => {
            if (!change) {
                //data.text = aes256.decrypt(key, data.text);

                // ilk mesaj yükleme
                if ( data.length ) {
                    setMessages([...data]);
                }
                
                // diğer mesaj yüklemeler
                else if (data.length !== 0) {
                    setMessages( m => [...m, data]);
                }

                change = true;
            }
        })
    })

    return (
        <div>
            {messages.map((message, i) => {
                return <Message {...message} key={'message' + i} />
            })}
        </div>
    )
}
