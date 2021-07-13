import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom';
import { BsFillSkipBackwardFill } from 'react-icons/bs';

export default function Header() {
    return (
        <div id="header">
            <Link to="/" className="back">
                <div className="anch">
                <BsFillSkipBackwardFill/>
                Go Back
                </div>
            </Link>
            <img src="/Capture.jpg" alt="CROCHAT"></img>
        </div>
    )
}
