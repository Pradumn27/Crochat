import { useState,useContext } from "react";
import Header from "./ChatComp/Header"
import SideBar from "./ChatComp/SideBar";
import Chat from "./ChatComp/Chat";
import "./ChatPage.css"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import VideoCall from "./ChatComp/VideoCall";
import {SocketContext} from "../../VideoContext/Context";

function ChatPage() {
  const {calling,callEnded} = useContext(SocketContext)
  const [roomId, setRoomId] = useState(null);
  return (
    <>
      {!callEnded && calling ? <VideoCall  roomId={roomId} /> 
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
