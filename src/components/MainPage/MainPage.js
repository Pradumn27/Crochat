import Header from "../Header"
import SideBar from "../SideBar";
import Chat from "../Chat";
import "./MainPage.css"
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';  

function MainPage() {
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

export default MainPage;
