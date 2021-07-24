import React, { useState, useEffect,useRef, useContext  } from 'react'
import { motion } from 'framer-motion';
import "./VideoCall.css"
import db from "../../../Firebase"
import {useStateValue} from "../../../StateReducer/StateProvider";
import { SocketContext } from '../../../VideoContext/Context';

function VideoCall({roomId}) {
    const { me, callAccepted, friendstream,stream, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [{user,id},]=useStateValue();
    const myVideo = useRef();
    const userVideo = useRef();
    const [fsi,setFsi]=useState(null);
    useEffect(()=>{
        if(roomId){
        db.collection("users").doc(id).collection("chats").doc(roomId).onSnapshot(snapShot=>{
            setFsi(snapShot.data()?.SocId);
        })
        myVideo.current.srcObject = stream;}
    },[roomId])

    useEffect(()=>{
        if(fsi){
            console.log(fsi);
            callUser(fsi);     
        }
    },[fsi])

    useEffect(()=>{
        if(friendstream){
        userVideo.current.srcObject = friendstream;}
    },[friendstream])
    return (
        <div className="main fix">
            <div className="andar">
                <motion.div className="backdrop"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    <motion.div className="container"
                        initial={{scale:0}}
                        animate={{scale:1}}
                    >
                        <video playsInline autoPlay muted ref={myVideo} className="vid" />
                        {friendstream &&
                        <video playsInline autoPlay muted ref={userVideo} className="vid"/>
                        }
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default VideoCall;