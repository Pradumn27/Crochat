import React, { createContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('https://crochat.herokuapp.com/');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const partnerVideo = useRef();
  const [callEnded,setCallEnded] = useState(true);
  const [calling, setCalling] = useState(false);
  const [audioCalling, setAudioCalling] = useState(false);
  const [audioCall, setAudioCall] = useState(false);

  useEffect(() => {
    socket.on('me', (id) => { setMe(id) });
    socket.on('callIncoming', ({ signal, from, name }) => {
      setCall({ isReceivingCall: true, from, name, signal });
    });
    socket.on("audioCall", () => {
      setAudioCall(true);
    })
  }, []);

  const callUser = (id) => {
    setCallEnded(false);
    !audioCalling ? setCalling(true) : setAudioCalling(true);
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(currentStream => {
      var peer = new Peer({ initiator: true, trickle: false, stream: currentStream });
      setStream(currentStream);
      if (peer) {
        
        if (audioCall) {
          socket.emit("audioCall", id);
        }
        
        peer.on('signal', (data) => {
          if (data. renegotiate || data.transceiverRequest) return
          socket.emit('callUser', { userToCall: id, signalData: data, from: me, name: "dd" });
        });
        
        peer.on("stream", stream => {
          if (partnerVideo.current) {
            partnerVideo.current.srcObject = stream;
          }
        })

        socket.on('callAccepted', (signal) => {
          peer.signal(signal);
          setCallAccepted(true);
        });

        socket.on("rejected", () => {
          setCalling(false);
          setCallEnded(true);
          setAudioCall(false);
          setAudioCalling(false);
          currentStream.getTracks().forEach(tracks => tracks.stop());
        })

        socket.on("hangedUp", () => {
          currentStream.getTracks().forEach(tracks => tracks.stop());
          setCallEnded(true);
          setCalling(false);
          setAudioCall(false);
          setAudioCalling(false);
          setAccepted(false);
          setCallAccepted(false);
        })

        peer.on("close",()=>{
          socket.emit("hangUp",id);
        })
        
        peer.on("error",(err)=>{
          console.log(err);
        })
        
      }
    });
  };

  const answerCall = () => {
    setCallEnded(false);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(currentStream => {
      setStream(currentStream);
      setAccepted(true);
      var peer = new Peer({ initiator: false, trickle: false, stream: currentStream });
      if (peer) {

        peer.on('signal', (data) => {
          socket.emit('answerCall', { signal: data, to: call.from });
        });

        peer.on('stream', stream => {
          if (partnerVideo.current) {
            partnerVideo.current.srcObject = stream;
          }
        });

        peer.signal(call.signal);

        peer.on("error",(err)=>{
          console.log(err);
        })

        socket.on("hangedUp", () => {
          setCallEnded(true);
          currentStream.getTracks().forEach(tracks => tracks.stop());
          setCalling(false);
          setAudioCall(false);
          setAudioCalling(false);
          setCall({});
          setAccepted(false);
          setCallAccepted(false);
        })
        
        peer.on("close",()=>{
          socket.emit("hangUp",call.from);
        })
      }
    });
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
      calling,
      setCalling,
      audioCalling,
      setAudioCalling,
      me,
      callEnded,
      setCallEnded,
      callUser,
      answerCall,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };