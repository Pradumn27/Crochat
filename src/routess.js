import React from 'react'
import Demo from "./components/MainMenu/Demo"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChatPage from "./components/ChatPage/ChatPage";

function Routess() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Demo}/>
                <Route path="/chat" exact component={ChatPage}/>
                <Route path="/chat/rooms/:roomId" exact component={ChatPage}/>
            </Switch>
        </Router>
    ) 
}

export default Routess
