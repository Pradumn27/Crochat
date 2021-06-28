import React from 'react'

export default function Message(props) {
    return (
        <div  className={props.cl ? props.cl:"message"}>
            <h2>Naam</h2>
            <div className="mess">
                <p>kya haal hai???ghvgvjdbcjhdujckjdjkdjk</p>
                <h5>time stamp</h5>
            </div>
        </div>
    )
}
