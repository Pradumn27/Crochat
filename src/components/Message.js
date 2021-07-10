import React from 'react'
import "./Message.css"
export default function Message(props) {
    return (
        <div  className={props.cl ? props.cl:"message"}>
            <h2>{props.name}</h2>
            <div className="mess">
                <h3>{props.message}</h3>
                <h5>{props.timestamp?.toUTCString().slice(0,-3)}</h5>
            </div>
        </div> 
    )
}
