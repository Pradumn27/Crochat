import { useState, useEffect, useContext,useRef } from "react";
import Header from "./ChatComp/Header"
import SideBar from "./ChatComp/SideBar";
import Chat from "./ChatComp/Chat";
import "./ChatPage.css"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import VideoCall from "./ChatComp/VideoCall";
import { SocketContext } from '../../VideoContext/Context';

function ChatPage() {
  const userVideo = useRef();
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  const [roomId, setRoomId] = useState(null);
  useEffect(()=>{
    console.log(roomId);
  },[roomId])
  return (
    <>
      {roomId ? <VideoCall  roomId={roomId} reff={userVideo}/> :call.isReceivingCall ? (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <h1>{call.name} is calling:</h1>
              <button  onClick={answerCall(userVideo)}>
                Answer
              </button>
            </div>
          )
      :(<div className="main">
        <div className="andar">
          <Header />          
          <div className="components">
            <Router>
              <SideBar/>
              <Switch>
                <Route path="/chat/rooms/:roomId"  render={(props) => <Chat {...props} setRoomId={setRoomId} />} />
              </Switch>
            </Router>
          </div>
        </div>
      </div>)}
    </>
  );
}

export default ChatPage;
