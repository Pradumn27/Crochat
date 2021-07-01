import Header from "./components/Header"
import SideBar from "./components/SideBar";
import Chat from "./components/Chat";
import "./MainPage.css"
import "./components/Demo.css"
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';  

function MainPage() {
  return (
    <div className="wow">
    <div className="enter">
      <img className="img-1" src="/1.jpg" alt=""/> 
      <img className="img-2" src="/2.jpg" alt=""/> 
    </div> 
    <div className="main">
      <div className="andar">
        <Header />
        <div className="components">
          <Router>
          <SideBar />
          <Switch>
          <Route path="/rooms/:roomId">
            <Chat />
          </Route>
          <Route path="/">
            <Chat/>
          </Route>
          </Switch>
          </Router>
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default MainPage;
