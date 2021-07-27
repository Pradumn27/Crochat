import React, { createContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const partnerVideo = useRef();
  const [calling, setCalling] = useState(false);
  const [audioCalling, setAudioCalling] = useState(false);
  const [audioCall,setAudioCall] = useState(false);

  useEffect(() => {
    socket.on('me', (id) => { setMe(id) });
    socket.on('callIncoming', ({ signal, from, name }) => {
      setCall({ isReceivingCall: true, from, name, signal });
    });
    socket.on("audioCall",()=>{
      setAudioCall(true);
    })
  }, []);

  const callUser = (id) => {
    setCalling(true);
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(currentStream => {
      setStream(currentStream);
      const peer1 = new Peer({ initiator: true, trickle: false, stream: currentStream });
      peer1.on('signal', (data) => {
        socket.emit('callUser', { userToCall: id, signalData: data, from: me, name: "dd" });
      });
      peer1.on("stream", stream => {
        if (partnerVideo.current) {
          partnerVideo.current.srcObject = stream;
        }
      })
      socket.on('callAccepted', (signal) => {
        peer1.signal(signal);
        setCallAccepted(true);
      });
      socket.on("rejected", () => {
        setCalling(false);
        setAudioCall(false);
        currentStream.getTracks().forEach(tracks => tracks.stop());
      })
      socket.on("hangedUp", () => {
        currentStream.getTracks().forEach(tracks => tracks.stop());
        setStream(null);
        setCallEnded(true);
        setAudioCall(false);
      })
      if(audioCall){
        socket.emit("audioCall",id);
      }
    });
  };

  const answerCall = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(currentStream => {
      setStream(currentStream);
      setAccepted(true);
      const peer2 = new Peer({ initiator: false, trickle: false, stream: currentStream });
      peer2.on('signal', (data) => {
        socket.emit('answerCall', { signal: data, to: call.from });
      });

      peer2.on('stream', stream => {
        if (partnerVideo.current) {
          partnerVideo.current.srcObject = stream;
        }
      });

      peer2.signal(call.signal);

      socket.on("hangedUp", () => {
        currentStream.getTracks().forEach(tracks => tracks.stop());
        setStream(null);
        setCallEnded(true);
        setCall({});
        setAudioCall(false)
      })
    });
  };

  const leaveCall = () => {
    setCallEnded(true);
    window.location.reload();
  };

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <video className="vid" playsInline ref={partnerVideo} autoPlay />
    );
  }
  let CallingPartnerVideo;
  if (accepted) {
    CallingPartnerVideo = (
      <video className="vid" playsInline ref={partnerVideo} autoPlay />
    );
  }


  return (
    <SocketContext.Provider value={{
      socket,
      call,
      setCall,
      callAccepted,
      stream,
      name,
      PartnerVideo,
      CallingPartnerVideo,
      partnerVideo,
      accepted,
      setName,
      audioCall,
      setAudioCall,
      callEnded,
      setCallEnded,
      calling,
      setCalling,
      audioCalling,
      setAudioCalling,
      me,
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