import React, { useState, useEffect, useContext } from 'react'
import { Avatar } from '@material-ui/core'
import "./SideBar.css"
import db from "../../../Firebase"
import { Link } from 'react-router-dom';
import { useStateValue } from '../../../StateReducer/StateProvider';

export default function SideChat({ roomId, friendId, name, photo, friendRoomId }) {
    const [messages, setMessages] = useState([]);
    const [{ id },] = useStateValue();
    useEffect(() => {
        if (roomId) {
            db.collection("users").doc(id).collection("chats").doc(roomId).collection("messages").orderBy('timestamp', 'desc').onSnapshot(snapShot => {
                setMessages(snapShot.docs.map(doc => doc.data())[0]?.message);
            })
        }
    }, [roomId]);

    return (
        <Link className="link" to={{
            pathname: `/chat/rooms/${roomId}`,
            state: {
                friendId: friendId,
                friendRoomId: friendRoomId,
                roomId: roomId,
                photo:photo,
            }
        }} >
            <div className="sidechat">
                <Avatar src={photo} />
                <div className="names">
                    <h4>{name}</h4>
                    <p>{window.outerWidth < 1190 ? messages?.slice(0, 15) : messages?.slice(0, 35)}..</p>
                </div>
            </div>
        </Link>
    )
}
