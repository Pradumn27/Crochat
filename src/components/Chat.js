import React,{useState,useEffect} from 'react'
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import { Call, Mic, VideoCall } from '@material-ui/icons';
import Message from "./Message"
import "./Chat.css"
import {useParams} from "react-router-dom";
import { Avatar } from '@material-ui/core';
import db from "../Firebase"
import firebase from 'firebase';
import {useStateValue} from "../StateReducer/StateProvider"

export default function Chat() {
    const [{user},dispatch]=useStateValue();
    const [inp,setInp]=useState('');
    const {roomId} = useParams();
    const [roomName,setRoomName]=useState('');
    const [messages,setMessages]=useState([]);
    useEffect(()=>{
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot(snapShot=>{
                setRoomName(snapShot.data()?.name)
            })
            db.collection("rooms").doc(roomId).collection('messages').orderBy("timestamp","asc").onSnapshot(snapShot=>{
                setMessages(snapShot.docs.map(doc=>doc.data()))
            })
        }
    },[roomId])
    const sendMessage = (e) =>{
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            name:user.displayName,
            message:inp,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInp("");
    }
    return (
        <div className="chat" >
            <div className="chatheader">
                <Avatar />
                <h3>{roomName}</h3>
                <div className="calls">
                    <Call/>
                    <VideoCall/>
                </div>
            </div>
            <div className="messages" >
                {messages.map(message=>{
                    return(<Message name={message?.name}cl={message.name==user.displayName?"message":"mess_reciever"} message={message.message} timestamp={message.timestamp?.toDate()} />
                )})}
            </div>
            <div className="chatfooter">
                <EmojiEmotionsOutlinedIcon/>
                <form>
                <input class="inp" placeholder="type message..."  value={inp} onChange={(e)=>{setInp(e.target.value)}} type="text"></input>
                <button class="but" onClick={sendMessage} type="submit"> Send a Message</button>
                </form>
                <Mic/>
            </div>
        </div>
    )
}
