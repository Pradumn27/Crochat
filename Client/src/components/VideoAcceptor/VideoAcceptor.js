import React, { useEffect,useRef, useContext  } from 'react'
import { motion } from 'framer-motion';
import "../ChatPage/ChatComp/VideoCall.css"
// import {useStateValue} from "../../../StateReducer/StateProvider";
import { SocketContext } from "../../VideoContext/Context";

function VideoAcceptor() {
    const { mystream,CallingPartnerVideo} = useContext(SocketContext); 
    const myVideo = useRef();

    useEffect(()=>{
        if(mystream){
        myVideo.current.srcObject = mystream;
        }
      },[mystream])
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
                        <video className="vid" playsInline muted autoPlay ref={myVideo}/>
                        {CallingPartnerVideo}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default VideoAcceptor;