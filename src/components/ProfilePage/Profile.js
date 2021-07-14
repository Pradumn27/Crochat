import { Avatar } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import "../ChatPage/ChatPage.css"
import MenuNav from '../MainMenu/MenuNav'
import "./Profile.css"
import { useStateValue } from "../../StateReducer/StateProvider"

function Profile() {
    const [{ user },] = useStateValue();
    const [dis, setDis] = useState(false);
    const [name,setName] = useState(user.displayName);
    useEffect(() => {
        setTimeout(() => {
            setDis(true);
        }, 3000);
    }, []);
    const changeName = (e)=>{
        e.preventDefault();
        console.log("enter");
    }

    return (
        <div className="main">
            <div className="andar">
                <div className="component">
                    <MenuNav />
                    <div className="profile">
                        <p className="line-1 typer">Here's Your Display Profile!!</p>
                        {dis && (
                            <div className="data">
                                <div className="dp">
                                    <h4>Display Picture : </h4>
                                    <div className="dp-in">
                                        <Avatar src={user.photoURL} style={{height:"90px" , width:"90px"}}/>
                                        <h3 className="change">Change your Display Picture</h3>
                                    </div>
                                </div>
                                <div className="dn">
                                    <h4>Display Name : </h4>
                                    <div className="dn-in">
                                        <form className="dn-form">
                                            <input className="inp" defaultValue={name} onChange={(e)=>{setName(e.target.value)}}></input>
                                            <button className="but" type="submit" onClick={changeName}>Save</button>
                                        </form>
                                    </div>
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
