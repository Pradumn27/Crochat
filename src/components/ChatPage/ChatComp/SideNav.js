import React from 'react'
import ChatIcon from '@material-ui/icons/Chat';
import ContactsIcon from '@material-ui/icons/Contacts';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar } from '@material-ui/core';
import "./SideBar.css"
import {useStateValue} from "../../../StateReducer/StateProvider"
import db from "../../../Firebase"
import firebase from "firebase"

export default function SideNav() {
    const [{user},] = useStateValue();
    const addGroup = () =>{
        const roomName = prompt("Please Enter Name for Chat");
        if(roomName !== "" || roomName !== null){
        db.collection("rooms").add({
            name:roomName,
            lastMessage:firebase.firestore.FieldValue.serverTimestamp(),
        })}
    }
    return (
        <div className="sidenav">
            <Avatar src={user.photoURL}/>
            <div className="icons">
            <ChatIcon />
            <ContactsIcon />
            <AddCircleOutlineIcon onClick={addGroup}/>
            <MoreVertIcon />
            </div>
        </div>
    )
}
