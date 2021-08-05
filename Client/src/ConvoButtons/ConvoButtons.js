import React, { useState, useContext } from 'react';
import { MdCallEnd, MdMic, MdMicOff, MdVideocam, MdVideocamOff, MdVideoLabel, MdCamera } from 'react-icons/md';
import ConversationButton from './ConversationButton';
import { SocketContext } from "../VideoContext/Context"

const styles = {
    buttonContainer: {
        display: 'flex',
        position: 'absolute',
        bottom: '22%',
        left: '43.5%'
    },
    icon: {
        width: '25px',
        height: '25px',
        fill: '#e6e5e8'
    }
};

const ConversationButtons = ({me,id}) => {
    const {socket, stream,audioCall,screenSharingActive,shareScreen,stopScreenShare} = useContext(SocketContext)
    const [mic,setMic] = useState(true);
    const [camera,setCamera] = useState(true);

    const handleMicButtonPressed = () => {
        stream.getAudioTracks()[0].enabled = !mic;
        setMic(!mic);
    };

    const handleCameraButtonPressed = () => {
        stream.getVideoTracks()[0].enabled = !camera;
        setCamera(!camera);
    };

    const handleScreenSharingButtonPressed = () => {
        // switchForScreenSharingStream();
        shareScreen();
    };

    const handleHangUpButtonPressed = () => {
        socket.emit("hangUp",id);
    };

    return (
        <div style={styles.buttonContainer}>
            {!screenSharingActive&&<ConversationButton onClickHandler={handleMicButtonPressed}>
                {mic ? <MdMic style={styles.icon} /> : <MdMicOff style={styles.icon} />}
            </ConversationButton>}
            <ConversationButton onClickHandler={handleHangUpButtonPressed}>
                <MdCallEnd style={styles.icon} />
            </ConversationButton>
            {!audioCall && <ConversationButton onClickHandler={handleCameraButtonPressed}>
                {camera ? <MdVideocam style={styles.icon} /> : <MdVideocamOff style={styles.icon} />}
            </ConversationButton>}
            {!screenSharingActive&&<ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
                {screenSharingActive ? <MdCamera style={styles.icon} /> : <MdVideoLabel style={styles.icon} />}
            </ConversationButton>}
        </div>
    );
};

export default ConversationButtons;