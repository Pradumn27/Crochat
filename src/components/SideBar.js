import React from 'react'
import SideNav from './SideNav'
import SideChat from './SideChat'
import { SearchOutlined } from '@material-ui/icons'

export default function SideBar() {
    return (
        <div className="sidebar">
            <SideNav/>
            <div className="sidebar_search">
                <div className="sidebar_search_cont">
                    <SearchOutlined />
                    <input placeholder="Search or start a new chat" type="text"></input>
                </div>
            </div>
            <div className="sidechats">
                <SideChat />
                <SideChat />
                <SideChat />
                <SideChat />
                <SideChat />
                <SideChat />
                <SideChat />
            </div>
        </div>
    )
}