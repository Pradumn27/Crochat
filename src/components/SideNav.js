import React from 'react'
import ChatIcon from '@material-ui/icons/Chat';
import ContactsIcon from '@material-ui/icons/Contacts';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar } from '@material-ui/core';
export default function SideNav() {
    return (
        <div className="sidenav">
            <Avatar />
            <div className="icons">
            <ChatIcon />
            <ContactsIcon />
            <AddCircleOutlineIcon />
            <MoreVertIcon />
            </div>
        </div>
    )
}
