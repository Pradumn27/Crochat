import React,{useState,useEffect,useContext} from 'react'
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import { Call, Mic, VideoCall} from '@material-ui/icons';
import Message from "./Message"
import "./Chat.css"
import {useLocation} from "react-router-dom";
import { Avatar } from '@material-ui/core';
import db from "../../../Firebase"
import firebase from 'firebase';
import {useStateValue} from "../../../StateReducer/StateProvider";
import {SocketContext} from "../../../VideoContext/Context";
import IncomingCallDialog from '../../../IncomingCall/IncomingCall';

export default function Chat({setRoomId}) {
    const {setCalling,setCallEnded,setAudioCalling,call} = useContext(SocketContext)
    const [{user,id},]=useStateValue();   
    const [inp,setInp]=useState('');
    const location = useLocation()
    const { friendId,roomId,friendRoomId } = location.state
    const [roomName,setRoomName]=useState('');
    const [messages,setMessages]=useState([]);
    useEffect(()=>{
        if(roomId){
            db.collection("users").doc(id).collection("chats").doc(roomId).onSnapshot(snapShot=>{
                setRoomName(snapShot.data()?.name);
            })
            db.collection("users").doc(id).collection("chats").doc(roomId).collection('messages').orderBy("timestamp","desc").onSnapshot(snapShot=>{
                setMessages(snapShot.docs.map(doc=>doc.data()))
            })
        };
    },[roomId]);

    const vidClick = () =>{
        setRoomId(friendId);
        setCalling(true);
        setCallEnded(false);
    }

    const audClick = () =>{
        setRoomId(friendId);
        setAudioCalling(true);
    }
    
    const sendMessage = (e) =>{
        e.preventDefault();
        db.collection("users").doc(id).collection("chats").doc(roomId).collection('messages').add({
            name:user.displayName,
            message:inp,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        db.collection("users").doc(id).collection("chats").doc(roomId).update({
            lastMessage:firebase.firestore.FieldValue.serverTimestamp()
        })
        db.collection("users").doc(friendId).collection("chats").doc(friendRoomId).collection('messages').add({
            name:user.displayName,
            message:inp,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        db.collection("users").doc(friendId).collection("chats").doc(friendRoomId).update({
            lastMessage:firebase.firestore.FieldValue.serverTimestamp()
        })
        setInp("");
    }
    return (
        <>
        {call?.isReceivingCall && <IncomingCallDialog />}
        <div className="chat" >
            <div className="chatheader">   
                <Avatar />
                <h3>{roomName}</h3>
                <div className="calls">
                    <Call onClick={()=>audClick()} /> 
                    <VideoCall onClick={()=>vidClick()} />
                </div>
            </div>
            <div className="messages" id="ms">
                {messages.map(message=>{
                    return(<Message key={message.id} name={message?.name} cl={message.name===user.displayName?"message":"mess_reciever"} message={message.message} timestamp={message.timestamp?.toDate()} />
                )})}
            </div>
            <div className="chatfooter">
                <EmojiEmotionsOutlinedIcon/>
                <form>
                <input className="inp" placeholder="type message..." value={inp} onChange={(e)=>{setInp(e.target.value)}} type="text"></input>
                <button className="but" onClick={sendMessage} type="submit"> Send a Message</button>
                </form>
                <Mic/>
            </div>
        </div>
    </>
    )
}