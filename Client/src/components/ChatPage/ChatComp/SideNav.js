import React from 'react'
import { Avatar } from '@material-ui/core';
import "./SideBar.css"
import {useStateValue} from "../../../StateReducer/StateProvider"

export default function SideNav() {
    const [{user},] = useStateValue();
    return (
        <div className="sidenav">
            <Avatar src={user.photoURL}/>
        </div>
    )
}
