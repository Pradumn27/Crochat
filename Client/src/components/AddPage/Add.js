import React,{useState} from 'react'
import "../ChatPage/ChatPage.css"
import MenuNav from '../MainMenu/MenuNav'
import "./Add.css"
import db from "../../Firebase"
import { useStateValue } from '../.././StateReducer/StateProvider';

function Add() {
    const [{id},] = useStateValue(); 
    const [friendId,setFriendId]= useState('');
    const requestSent = (e)=>{
        e.preventDefault();
        db.collection("users").doc(friendId).collection("requests").add({
            friend:id,
        })
        setFriendId('');
    }
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
                                <input className="input" value={friendId} onChange={(e)=>setFriendId(e.target.value)} />
                                <button className="bn" onClick={requestSent} type="submit">Send Request</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add
