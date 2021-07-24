import React from 'react'
import "../ChatPage/ChatPage.css"
import "./Menu.css"
import MenuNav from './MenuNav'

function Menu() {
    return( 
        <div className="main">
            <div className="andar">
                <div className="component">
                    <MenuNav/>      
                    <main>
                        <div className="main-page">
                            <h1>
                                Welcome To Crochat
                            </h1>
                            <h4>A chatting application for fun</h4>
                            <ul>
                                <li>Update your Profile</li>
                                <li>Add Friends</li>
                                <li>Video/Audio call with Friends</li>
                                <li>Enter Chat Mode</li>
                            </ul>
                        </div>
                    </main>
                </div>
            </div>
        </div>
        )
}

export default Menu;
