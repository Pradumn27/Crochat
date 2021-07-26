import React, { useEffect, useRef, useContext } from 'react'
import { motion } from 'framer-motion';
import "../ChatPage/ChatComp/VideoCall.css"
// import {useStateValue} from "../../../StateReducer/StateProvider";
import { SocketContext } from "../../VideoContext/Context";
import ConversationButtons from '../.././ConvoButtons/ConvoButtons';

function VideoAcceptor() {
    const { stream, CallingPartnerVideo } = useContext(SocketContext);
    const myVideo = useRef();

    useEffect(() => {
        if (stream) {
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
                <ConversationButtons />
            </div>
        </div>
    )
}

export default VideoAcceptor;