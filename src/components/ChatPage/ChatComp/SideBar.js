import React, { useState, useEffect } from "react";
import SideNav from "./SideNav";
import SideChat from "./SideChat";
import { SearchOutlined } from "@material-ui/icons";
import "./SideBar.css";
import db from "../../../Firebase";

export default function SideBar() {
    const [rooms, setRooms] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        const data = db.collection("rooms").orderBy('lastMessage', 'desc').onSnapshot((snapshot) =>
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        );
        return () => {
            data();
        };
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
                {rooms.filter((val) => {
                    if (search === "") { return val; }
                    else if ((val.data.name.toLowerCase()).includes(search.toLowerCase())) { return val; }
                }).map((room) => {
                    return <SideChat key={room.id} id={room.id} name={room.data.name} />;
                })}
            </div>
        </div>
    );
}