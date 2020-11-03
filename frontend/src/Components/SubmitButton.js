import React from 'react';

export default function SubmitButton({ handleClick }) {
    return (
        <div>
            <button 
                style={style} 
                type='submit' 
                onClick={handleClick}> 
                Gönder 
            </button>
        </div>
    );

}

const style = {
    display: "block",
    width: '100%',
    border: "none",
    borderRadius: "10%",
    backgroundColor: "#4CAF50",
    padding: "14px 28px",
    textAlign: "center",
}