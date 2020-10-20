import React, { useState, useEffect } from 'react';
import Message from './Message';
import aes256 from 'aes256';

export default function Messages(props) {
    const [ messages, setMessages ] = useState([])
    let change = false
    const { socket, key } = props;

    useEffect( () => {
        socket.on('chat', (data) => {
            if (!change) {
                data.text =  aes256.decrypt(key, data.text);
                setMessages( m => [...m, data]);
                console.log(data)
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
