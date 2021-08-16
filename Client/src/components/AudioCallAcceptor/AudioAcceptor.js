import React, { useEffect, useRef, useContext } from 'react'
import { motion } from 'framer-motion';
import "../ChatPage/ChatComp/VideoCall.css"
import { SocketContext } from "../../VideoContext/Context";
import ConversationButtons from '../.././ConvoButtons/ConvoButtons';

function AudioAcceptor() {
    const { stream,me, CallingPartnerVideo,call,setAudioCall } = useContext(SocketContext);
    const myVideo = useRef();

    useEffect(()=>{
        setAudioCall(true);
    },[])
    useEffect(() => {
        if (stream) {
            stream.getVideoTracks()[0].enabled=false;
            myVideo.current.srcObject = stream;
        }
    }, [stream])
    return (
        <div className="main fix">
            <div className="andar vido">
                <motion.div className="container"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    <video className="vid" playsInline muted autoPlay ref={myVideo} />
                    {CallingPartnerVideo}
                </motion.div>
                {stream&&<ConversationButtons me={me} id={call.from}/>}
            </div>
        </div>
    )
}

export default AudioAcceptor;