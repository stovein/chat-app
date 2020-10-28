import React from 'react';

export default function Message(props) {
    const { sender, message, date} = props;
    
    return (
        <div>
            <p>{sender}: {message} : {date}</p>
        </div>
    )
}
