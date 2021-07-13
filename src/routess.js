import React from 'react'
import Demo from "./components/MainMenu/Demo"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainPage from "./components/MainPage/MainPage";

function Routess() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Demo}/>
                <Route path="/chat" exact component={MainPage}/>
                <Route path="/chat/rooms/:roomId" exact component={MainPage}/>
            </Switch>
        </Router>
    ) 
}

export default Routess
