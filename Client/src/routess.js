import React,{useEffect,useState,useContext} from 'react'
import Menu from "./components/MainMenu/Menu"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChatPage from "./components/ChatPage/ChatPage";
import Profile from './components/ProfilePage/Profile';
import Add from "./components/AddPage/Add";
import Requests from "./components/RequestsPage/Requests"
import { useStateValue } from './StateReducer/StateProvider';
import { actionTypes } from './StateReducer/Reducer';
import Loading from "./Loading/Loading"
import {SocketContext} from"./VideoContext/Context";
import db from "./Firebase"
import VideoAcceptor from "./components/VideoAcceptor/VideoAcceptor"

function Routess({id}) {
    const {me,call,answerCall,accepted} = useContext(SocketContext);
    const [,dispatch] = useStateValue();
    const [is,setIs] = useState(true)
    useEffect(()=>{
        dispatch({
            type:actionTypes.SET_ID,
            id:id,
        });
        setIs(false);
    },[dispatch])
    useEffect(()=>{
        db.collection("users").doc(id).update({
            soc:me,
        })
    },[])

    return (
        <>
        {is?<Loading />:accepted?(<VideoAcceptor />):call.isReceivingCall?(<>
        <button onClick={answerCall} />
        </>):(
        <Router>
            <Switch>
                <Route path="/" exact component={Menu} />
                <Route path="/chat" exact component={ChatPage} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/add" exact component={Add} />
                <Route path="/requests" exact component={Requests} />
                <Route path="/chat/rooms/:roomId" exact component={ChatPage} />
            </Switch>
        </Router>)}
        </>
    )
}

export default Routess