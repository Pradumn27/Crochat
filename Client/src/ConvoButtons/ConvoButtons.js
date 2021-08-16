import React, { useState, useContext } from 'react';
import { MdCallEnd, MdMic, MdMicOff, MdVideocam, MdVideocamOff } from 'react-icons/md';
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

const ConversationButtons = ({ id }) => {
    const { socket, stream, audioCall } = useContext(SocketContext)
    const [mic, setMic] = useState(true);
    const [camera, setCamera] = useState(true);

    const handleMicButtonPressed = () => {
        stream.getAudioTracks()[0].enabled = !mic;
        setMic(!mic);
    };

    const handleCameraButtonPressed = () => {
        stream.getVideoTracks()[0].enabled = !camera;
        setCamera(!camera);
    };

    const handleHangUpButtonPressed = () => {
        socket.emit("hangUp", id);
    };

    return (
        <div style={styles.buttonContainer}>
            <ConversationButton onClickHandler={handleMicButtonPressed}>
                {mic ? <MdMic style={styles.icon} /> : <MdMicOff style={styles.icon} />}
            </ConversationButton>
            <ConversationButton onClickHandler={handleHangUpButtonPressed}>
                <MdCallEnd style={styles.icon} />
            </ConversationButton>
            {!audioCall && <ConversationButton onClickHandler={handleCameraButtonPressed}>
                {camera ? <MdVideocam style={styles.icon} /> : <MdVideocamOff style={styles.icon} />}
            </ConversationButton>}
        </div>
    );
};

export default ConversationButtons;