import { Avatar } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import "../ChatPage/ChatPage.css"
import MenuNav from '../MainMenu/MenuNav'
import "./Profile.css"
import { useStateValue } from "../../StateReducer/StateProvider"
import db from "../../Firebase"

function Profile() {
    const [{ user, id },] = useStateValue();
    const [dis, setDis] = useState(false);
    const [name, setName] = useState(user.displayName);
    const [hov, setHov] = useState(false);
    const [hove, setHove] = useState(false);
    const [photo, setPhoto] = useState(user.photoURL);
    const [chats, setChats] = useState({});
    useEffect(() => {
        db.collection("users").doc(id).collection("chats").onSnapshot((snapshot) =>
            setChats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        )
        setTimeout(() => {
            setDis(true);
        }, 2200);


    }, []);
    useEffect(() => {
        setPhoto(user.photoURL);
    }, [user.photoURL])
    const changeName = (e) => {
        e.preventDefault();
        db.collection('users').doc(id).update({
            name: name,
        })
        chats.map((chat)=>{
            db.collection("users").doc(chat.data.friend).collection("chats").doc(chat.data.friendRoomId).update({
                name:name,
            })
        })
    }
    const clipped = () => {
        // For Chrome
        navigator.clipboard.writeText(id);
        // For Older Browser Versions
        // window.clipboardData.setData("Text", 123455);
    }

    return (
        <div className="main">
            <div className="andar">
                <div className="component">
                    <MenuNav />
                    <div className="profile">
                        <p className="line-1 typer">Here's Your Display Profile!!</p>
                        {dis && (
                            <div className="elements">
                                <div className="data">
                                    <div className="dp">
                                        <h4>Display Picture : </h4>
                                        <div className="dp-in">
                                            <Avatar src={photo} style={{ height: "60px", width: "60px" }} />
                                            {/* <input type="file" className="change" onChange={onImageChange}></input> */}
                                        </div>
                                    </div>
                                    <div className="dn">
                                        <h4>Display Name : </h4>
                                        <div className="dn-in">
                                            <form className="dn-form">
                                                <input onMouseEnter={() => { setHove(true); }} onMouseLeave={() => { setHove(false) }} className="inpt" defaultValue={name} onChange={(e) => { setName(e.target.value) }}></input>
                                                <h5 className={hove ? "save" : "nosave"}>(Press Enter To Save)</h5>
                                                <button className="but" type="submit" onClick={changeName}>Save</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="invitation">
                                    <h4>Invitation Code :</h4>
                                    <h3 className={hov ? "hov" : ""} onMouseEnter={() => { setHov(true); }} onMouseLeave={() => { setHov(false) }} onClick={clipped} >{hov ? "copy to clipboard" : id}</h3>
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
