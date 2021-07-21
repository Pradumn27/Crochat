import Header from "./ChatComp/Header"
import SideBar from "./ChatComp/SideBar";
import Chat from "./ChatComp/Chat";
import "./ChatPage.css"
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';  

function ChatPage() {
  return (
    <div className="main">
      <div className="andar">
        <Header />
        <div className="components">
          <Router>
          <SideBar />
          <Switch>
          <Route path="/chat/rooms/:roomId" component={Chat}/>
          </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
