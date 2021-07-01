import React,{useState,useEffect} from 'react'
import { Avatar } from '@material-ui/core'
import "./SideBar.css"
import db from "../Firebase"
import {Link} from 'react-router-dom';

export default function SideChat({id,name}) {
    const [messages,setMessages]=useState([]);
    useEffect(()=>{
        if(id){
            db.collection("rooms").doc(id).collection("messages").orderBy('timestamp','desc').onSnapshot(snapShot=>{
                setMessages(snapShot.docs.map(doc=>doc.data()));
            })
        }
    },[id]) 
    return (
        <Link className="link" to={`/rooms/${id}`} key={id}>
        <div className="sidechat">
            <Avatar src="https://avatars.dicebear.com/api/human/1234.svg" />
            <div className="names">
                <h4>{name}</h4>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
    )
}
