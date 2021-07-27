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
    const {socket, stream} = useContext(SocketContext)
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
    };

    const handleHangUpButtonPressed = () => {
        socket.emit("hangUp",({me:me,to:id}));
    };

    return (
        <div style={styles.buttonContainer}>
            <ConversationButton onClickHandler={handleMicButtonPressed}>
                {mic ? <MdMic style={styles.icon} /> : <MdMicOff style={styles.icon} />}
            </ConversationButton>
            <ConversationButton onClickHandler={handleHangUpButtonPressed}>
                <MdCallEnd style={styles.icon} />
            </ConversationButton>
            <ConversationButton onClickHandler={handleCameraButtonPressed}>
                {camera ? <MdVideocam style={styles.icon} /> : <MdVideocamOff style={styles.icon} />}
            </ConversationButton>
            {/* <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
                {screenSharingActive ? <MdCamera style={styles.icon} /> : <MdVideoLabel style={styles.icon} />}
            </ConversationButton> */}
        </div>
    );
};

export default ConversationButtons;