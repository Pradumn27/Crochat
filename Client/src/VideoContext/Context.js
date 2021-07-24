import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [friendstream, setFriendStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');

    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
        });
  
      socket.on('me', (id) => {setMe(id)});
  
      socket.on('callIncoming', ({ signal,from, name }) => {
        setCall({ isReceivingCall: true, from, name, signal });
      });
    }, [call.isReceivingCall]);
  
    const answerCall = () => {
      setCallAccepted(true);
  
      const peer = new Peer({ initiator: false, trickle: false, stream });
  
      peer.on('signal', (data) => {
        socket.emit('answerCall', { signal: data, to: call.from });
      });
  
      peer.on('stream', (currentStream) => {
        setFriendStream(currentStream);
      });
  
      peer.signal(call.signal);
    };
  
    const callUser = (id) => {
      const peer = new Peer({ initiator: true, trickle: false, stream });
  
      peer.on('signal', (data) => {
        socket.emit('callUser', { userToCall: id, signalData: data, from: me, name:"dd" });
      });
  
      peer.on('stream', (currentStream) => {
        setFriendStream(currentStream);
      });
  
      socket.on('callAccepted', (signal) => {
        setCallAccepted(true);
  
        peer.signal(signal);
      });
    };
  
    const leaveCall = () => {
      setCallEnded(true);
      window.location.reload();
    };
  
    return (
      <SocketContext.Provider value={{
        call,
        callAccepted,
        stream,
        name,
        setName,
        callEnded,
        me,
        friendstream,
        callUser,
        leaveCall,
        answerCall,
      }}
      >
        {children}
      </SocketContext.Provider>
    );
  };
  
  export { ContextProvider, SocketContext };