import React, { useState } from 'react';
import socketIOClient from "socket.io-client";
import crypto from 'crypto';
import SendArea from "./SendArea";
import Messages from './Messages';

export default function Room(props) {
    const { room, name } = props;
    const [ key, setKey ] = useState('');
    let socket = socketIOClient('http://127.0.0.1:5000');
    const edch = crypto.createECDH('secp521r1');
    edch.generateKeys();

    return (
        <div>
            <h4> {name}, You are in: {room.name} </h4>
            <Messages 
                socket={socket} 
                edch={edch} 
                key={key}
            />
            <SendArea 
                socket={socket}
                room={room}
                key={key}
                name={name}
                edch={edch}
                handleOtherKey={(v) => setKey(v) }
            />
        </div>
    )
}
