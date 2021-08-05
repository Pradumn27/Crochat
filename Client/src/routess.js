import React, { useEffect, useState, useContext } from 'react'
import Menu from "./components/MainMenu/Menu"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChatPage from "./components/ChatPage/ChatPage";
import Profile from './components/ProfilePage/Profile';
import Add from "./components/AddPage/Add";
import Requests from "./components/RequestsPage/Requests";
import { useStateValue } from './StateReducer/StateProvider';
import { actionTypes } from './StateReducer/Reducer';
import Loading from "./Loading/Loading";
import { SocketContext } from "./VideoContext/Context";
import db from "./Firebase";
import VideoAcceptor from "./components/VideoAcceptor/VideoAcceptor";
import IncomingCallDialog from './IncomingCall/IncomingCall';
import AudioAcceptor from "./components/AudioCallAcceptor/AudioAcceptor";
import useOnlineStatus from '@rehooks/online-status';;

function Routess({ id }) {
    const { me, call, accepted,callEnded,audioCall } = useContext(SocketContext);
    const [, dispatch] = useStateValue();
    const [is, setIs] = useState(true)
    const onlineStatus = useOnlineStatus();
    useEffect(() => {
        dispatch({
            type: actionTypes.SET_ID,
            id: id,
        });
        setIs(false);
    }, [dispatch])
    useEffect(() => {
        db.collection("users").doc(id).update({
            soc: me,
        })
    }, [])
    useEffect(()=>{
        db.collection("users").doc(id).update({
            online:onlineStatus,
        })
    },[onlineStatus]);

    return (
        <>
            {is ? <Loading />:!callEnded && accepted && audioCall ? (<AudioAcceptor />) : !callEnded && accepted ? (<VideoAcceptor />) : (
                <>
                    {call?.isReceivingCall && <IncomingCallDialog />}
                    <Router>
                        <Switch>
                            <Route path="/" exact component={Menu} />
                            <Route path="/chat" exact component={ChatPage} />
                            <Route path="/profile" exact component={Profile} />
                            <Route path="/add" exact component={Add} />
                            <Route path="/requests" exact component={Requests} />
                            <Route path="/chat/rooms/:roomId" exact component={ChatPage} />
                        </Switch>
                    </Router>
                </>
            )}
        </>
    )
}

export default Routess