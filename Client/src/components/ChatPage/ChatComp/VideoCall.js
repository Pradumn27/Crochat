import React, { useState, useEffect, useRef, useContext } from 'react'
import { motion } from 'framer-motion';
import "./VideoCall.css"
import db from "../../../Firebase"
// import {useStateValue} from "../../../StateReducer/StateProvider";
import { SocketContext } from '../../../VideoContext/Context';
import ConversationButtons from '../../../ConvoButtons/ConvoButtons';

function VideoCall({ roomId }) {
    const { stream, callUser, PartnerVideo } = useContext(SocketContext);
    const myVideo = useRef();
    const [fsi, setFsi] = useState(null);
    useEffect(() => {
        if (roomId) {
            db.collection("users").doc(roomId).onSnapshot(snapShot => setFsi(snapShot.data().soc))
        }
    }, [roomId])

    useEffect(() => {
        if (fsi) {
            callUser(fsi);
        }
    }, [fsi])

    useEffect(() => {
        myVideo.current.srcObject = stream;
    }, [stream])

    return (
        <div className="main fix">
            <div className="andar vido">
                <motion.div className="container"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    <video playsInline autoPlay muted ref={myVideo} className="vid" />
                    {PartnerVideo}
                </motion.div>
                <ConversationButtons />
            </div>
        </div>
    )
}

export default VideoCall;