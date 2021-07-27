import React,{useContext,useState,useEffect,useRef} from 'react'
import "./VideoCall.css"
import db from "../../../Firebase"
import { motion } from 'framer-motion';
import {SocketContext} from "../../../VideoContext/Context"
import ConversationButtons from '../../../ConvoButtons/ConvoButtons';

function AudioCall({roomId}) {
    const {me,stream,setAudioCall,callUser,audioCall,partnerVideo,PartnerVideo} = useContext(SocketContext)
    const myAudio = useRef();
    const [fsi, setFsi] = useState(null);
    useEffect(() => {
        if (roomId) {
            db.collection("users").doc(roomId).onSnapshot(snapShot => setFsi(snapShot.data().soc))
        }
    }, [roomId])

    useEffect(()=>{
        setAudioCall(true);
    },[])
    useEffect(()=>{
        if(fsi&&audioCall){
            callUser(fsi)
        }
    },[fsi])
    useEffect(()=>{
        if(stream){
            stream.getVideoTracks()[0].enabled=false;
            myAudio.current.srcObject=stream;
        }
    },[stream])
    return (
        <div className="main fix">
            <div className="andar vido">
                <motion.div className="container"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    <video playsInline autoPlay muted ref={myAudio} poster="capture.jpg" className="vid" />
                    {PartnerVideo}
                </motion.div>
                {fsi&&<ConversationButtons me={me} id={fsi}/>}
            </div>
        </div>
    )
}

export default AudioCall
