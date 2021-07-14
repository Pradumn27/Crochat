import React from 'react'
import Menu from "./components/MainMenu/Menu"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChatPage from "./components/ChatPage/ChatPage";
import Profile from './components/ProfilePage/Profile';
import Add from "./components/AddPage/Add";
import Requests from "./components/RequestsPage/Requests"

function Routess() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Menu}/>
                <Route path="/chat" exact component={ChatPage}/>
                <Route path="/profile" exact component={Profile}/>
                <Route path="/add" exact component={Add}/>
                <Route path="/requests" exact component={Requests}/>
                <Route path="/chat/rooms/:roomId" exact component={ChatPage}/>
            </Switch>
        </Router>
    ) 
}

export default Routess
