import React from 'react';

export default function Message(props) {
    const { text, user, timestamp} = props;
    
    return (
        <div>
            <p>{user}: {text} : {timestamp}</p>
        </div>
    )
}
