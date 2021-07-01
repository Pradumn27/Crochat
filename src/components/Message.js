import React from 'react'
import "./Message.css"
export default function Message(props) {
    return (
        <div  className={props.cl ? props.cl:"message"}>
            <h2>{props.name}</h2>
            <div className="mess">
                <p>{props.message}</p>
                <h5>{props.timestamp?.toUTCString()}</h5>
            </div>
        </div>
    )
}
