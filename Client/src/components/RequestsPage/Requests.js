import React, { useState, useEffect } from 'react'
import "../ChatPage/ChatPage.css"
import MenuNav from '../MainMenu/MenuNav'
import "./Requests.css"
import db from "../../Firebase"
import Request from "./Request"
import { useStateValue } from "../../StateReducer/StateProvider"

function Requests() {
    const [{ id },] = useStateValue();
    const [req, setReq] = useState([]);
    const [hov, setHov] = useState(false);
    const clipped = () => {
        navigator.clipboard.writeText(id);
    }
    useEffect(() => {
        if(id){
        db.collection("users").doc(id).collection("requests").onSnapshot(snapShot => {
            setReq(snapShot.docs.map(doc => ({
                data:doc.data(),
                docId:doc.id
            })));
        });}
    }, [id])
    return (
        <div className="main">
            <div className="andar">
                <div className="component">
                    <MenuNav />
                    {req.length === 0 ? (
                        <div className="empty-req">
                            <div className="Empty">
                                <h2 className="emptyText">Whoops!!Looks like you don't have any friend requests at the moment....</h2>
                                <h4>How about sharing your code below with your friends:</h4>
                                <div className="invitatio">
                                    <h4>Invitation Code :</h4>
                                    <h3 className={hov ? "hov" : ""} onMouseEnter={() => { setHov(true); }} onMouseLeave={() => { setHov(false) }} onClick={clipped} >{hov ? "copy to clipboard" : id}</h3>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="requests">
                            <div className="full">
                                <div className="top-text">
                                    <h2>People are waiting to be friends with you!!</h2>
                                    <p>Checkout their friend requests...</p>
                                </div>
                                <div className="reqs">
                                    {req.map(re => {
                                        return (<Request idd={re.data.friend} docId={re.docId} />)
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Requests