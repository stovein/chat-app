import React from 'react';

export default function roomSelection({ name, setRoom }) {
    const rooms = [
        {name: 'Hebele', id:111111111111},
        {name: 'Laciverte Boyayanlar', id:222222222},
        {name: '35 kuruş', id:333333333},
        {name: 'Ebelere Atlayanlar', id:444444444}
    ]

    return (
        <div>
            <h4> {name}, select a room. </h4>
            {rooms.map((r, i) => {
                const roomName = r.name;
                return (
                <button 
                    key={i} 
                    type='submit' 
                    onClick={() => setRoom(r)}>
                {roomName}
                </button>)
            })}
        </div>
    );
}