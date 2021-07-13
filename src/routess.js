import React from 'react'
import Menu from "./components/MainMenu/Menu"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChatPage from "./components/ChatPage/ChatPage";
import Profile from './components/ProfilePage/Profile';

function Routess() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Menu}/>
                <Route path="/chat" exact component={ChatPage}/>
                <Route path="/profile" exact component={Profile}/>
                <Route path="/chat/rooms/:roomId" exact component={ChatPage}/>
            </Switch>
        </Router>
    ) 
}

export default Routess
