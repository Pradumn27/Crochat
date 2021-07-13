import { Avatar } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import "../ChatPage/ChatPage.css"
import MenuNav from '../MainMenu/MenuNav'
import "./Profile.css"
import {useStateValue} from "../../StateReducer/StateProvider"

function Profile() {
    const [{user},] = useStateValue();
    const [dis,setDis] = useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            setDis(true);
        },3000);
    },[]);

    return (
        <div className="main">
            <div className="andar">
                <div className="component">
                    <MenuNav/>
                    <div className="profile">
                        <p className="line-1 typer">Here's Your Display Profile!!</p>
                        {dis&&(
                        <div className="data">
                            <div className="dp">
                                <h2>Display Picture:</h2>
                                <Avatar src={user.photoURL} style={{ height: '100px', width: '100px' }} />
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
