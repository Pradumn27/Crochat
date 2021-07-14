import React from 'react'
import "../ChatPage/ChatPage.css"
import MenuNav from '../MainMenu/MenuNav'
import "./Add.css"

function Add() {
    return (
        <div className="main">
            <div className="andar">
                <div className="component">
                    <MenuNav />
                    <div className="addfr">
                        <h1>Add Your Friends...</h1>
                        <div className="invitation-link">
                            <h4>Enter Your Friend's Inviation Code Below </h4>
                            <form className="form">
                            <input className="input"/>
                            <button className="bn">Send Request</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add
