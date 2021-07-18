import React, { useEffect, useState } from 'react'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { Avatar } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import db from "../../Firebase"
import {useStateValue} from "../../StateReducer/StateProvider"

function Request({ idd ,docId}) {
    const [{id},]=useStateValue();
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    useEffect(() => {
        db.collection("users").doc(idd).get().then((doc) => {
            setName(doc.data().name);
            setPhoto(doc.data().photoUrl);
        })
    }, [])
    const accept=()=>{
        db.collection("users").doc(id).collection("friends").add({
            friend:idd,
        });
        db.collection("users").doc(idd).collection("friends").add({
            friend:id,
        });
        db.collection("users").doc(id).collection("requests").doc(docId).delete();
        alert("Friend added");
    }
    const reject=()=>{
        db.collection("users").doc(id).collection("requests").doc(docId).delete()
    }
    return (
        <div className="request">
            <div className="Names">
                <Avatar src={photo} style={{ height: "60px", width: "60px" }} />
                <h3 className="name">{name}</h3>
            </div>
            <div className="req-icons">
                <div className="icon">
                    <DoneOutlineIcon onClick={accept} />
                </div>
                <div className="icon">
                    <CancelIcon onClick={reject}/>
                </div>
            </div>
        </div>
    )
}

export default Request
