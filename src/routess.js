import React from 'react'
import Demo from "./components/MainMenu/Demo"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainPage from "./components/MainPage/MainPage";

function Jag() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Demo}/>
                <Route path="/chat" exact component={MainPage}/>
            </Switch>
        </Router>
    )
}

export default Jag