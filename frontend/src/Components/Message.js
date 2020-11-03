import React from 'react';

export default function Message({ sender, message, date}) {    
    return (
        <div>
            <p>{sender}: {message} : {date}</p>
        </div>
    )
}
