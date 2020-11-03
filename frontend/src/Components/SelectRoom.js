import React, { useState } from 'react';
import Room from "./Room";
import RoomSelection from "./RoomSelection";

export default function SelectRoom({ name }) {
    const [ room, setRoom ] = useState('');

    return (
        <div>
            { room ? <Room name={name} room={room} /> : <RoomSelection name={ name } setRoom={setRoom} /> }
        </div>
    )
}
