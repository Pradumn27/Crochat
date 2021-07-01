import React from 'react'
import ChatIcon from '@material-ui/icons/Chat';
import ContactsIcon from '@material-ui/icons/Contacts';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar } from '@material-ui/core';
import "./SideBar.css"
import {useStateValue} from "../StateReducer/StateProvider"
import db from "../Firebase"

export default function SideNav() {
    const [{user},dispatch] = useStateValue();
    const addGroup = () =>{
        const roomName = prompt("Please Enter Name for Chat");
        if(roomName!=""){
        db.collection("rooms").add({
            name:roomName
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
