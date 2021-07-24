import React, { useState, useEffect } from "react";
import SideNav from "./SideNav";
import SideChat from "./SideChat";
import { SearchOutlined } from "@material-ui/icons";
import "./SideBar.css";
import db from "../../../Firebase";
import {useStateValue} from "../../../StateReducer/StateProvider"

export default function SideBar({me}) {
    const [{id},]=useStateValue();
    const [chats, setChats] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        if(id){
        const data = db.collection("users").doc(id).collection("chats").orderBy('lastMessage', 'desc').onSnapshot((snapshot) =>
            setChats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        );
        return () => {
            data();
        };}
    }, []);
    return (
        <div className="sidebar">
            <SideNav />
            <div className="sidebar_search">
                <div className="sidebar_search_cont">
                    <SearchOutlined />
                    <input placeholder="Search or start a new chat" type="text" onChange={(e) => setSearch(e.target.value)}></input>
                </div>
            </div>
            <div className="sidechats">
                {chats.filter((val) => {
                    if (search === "") { return val; }
                    else if ((val.data.name.toLowerCase()).includes(search.toLowerCase())) { return val; }
                }).map((chat) => {
                    return <SideChat key={chat.id} me={me} roomId={chat.id} friendId={chat.data.friend} name={chat.data.name} photo={chat.data.photo} friendRoomId={chat.data.friendRoomId}/>;
                })}
            </div>
        </div>
    );
}