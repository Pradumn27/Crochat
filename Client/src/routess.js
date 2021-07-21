import React,{useEffect,useState} from 'react'
import Menu from "./components/MainMenu/Menu"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChatPage from "./components/ChatPage/ChatPage";
import Profile from './components/ProfilePage/Profile';
import Add from "./components/AddPage/Add";
import Requests from "./components/RequestsPage/Requests"
import { useStateValue } from './StateReducer/StateProvider';
import { actionTypes } from './StateReducer/Reducer';
import Loading from "./Loading/Loading"

function Routess({id}) {
    const [,dispatch] = useStateValue();
    const [is,setIs] = useState(true)
    useEffect(()=>{
        dispatch({
            type:actionTypes.SET_ID,
            id:id,
        });
        setIs(false);
    },[])
    return (
        <>
        {is?<Loading />:(
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