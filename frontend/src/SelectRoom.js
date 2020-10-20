import React, { useState } from 'react';
import Room from "./Room";

export default function SelectRoom(props) {
    const [ room, setRoom ] = useState('');
    const { name } = props;
    const rooms = [
        {name: 'Hebele', id:111111111111},
        {name: 'Laciverte Boyayanlar', id:222222222},
        {name: '35 kuruş', id:333333333},
        {name: 'Ebelere Atlayanlar', id:444444444}
    ]

    const roomSelection = () => {
        return (
            rooms.map((r, i) => {
                const roomName = r.name;
                return (
                <button 
                    key={i} 
                    type='submit' 
                    onClick={() => setRoom(r)}>
                {roomName}
                </button>)
            })
        );
    }


    return (
        <div>
            <h4> {name}, select a room. </h4>
            { room ? <Room name={name} room={room} /> : roomSelection() }
        </div>
    )
}
