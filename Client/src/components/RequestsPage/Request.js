import React, { useEffect, useState } from 'react'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { Avatar } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import db from "../../Firebase"
import { useStateValue } from "../../StateReducer/StateProvider"
import firebase from "firebase"

function Request({ idd, docId }) {
    const [{ id, user },] = useStateValue();
    const [name, setName] = useState('');
    const [fri, setFri] = useState('');
    const [mi, setMi] = useState('');
    const [photo, setPhoto] = useState('');
    useEffect(() => {
        db.collection("users").doc(idd).get().then((doc) => {
            setName(doc.data().name);
            setPhoto(doc.data().photoUrl);
        })
    }, [idd])
    useEffect(() => {
        if (fri !== '') {
            db.collection("users").doc(id).collection("chats").doc(mi).update({
                friendRoomId: fri,
            })
            db.collection("users").doc(idd).collection("chats").doc(fri).update({
                friendRoomId: mi,
            })
            alert("Friend added");
            db.collection("users").doc(id).collection("requests").doc(docId).delete();
        }
    }, [fri,mi,idd])
    const accept = () => {
        db.collection("users").doc(id).collection("friends").add({
            friend: idd,
            name: name,
            photo: photo,
        });
        db.collection("users").doc(id).collection("chats").add({
            friend: idd,
            name: name,
            photo: photo,
            friendRoomId: null,
            lastMessage: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(docRef => {
            setMi(docRef.id);
        });
        db.collection("users").doc(idd).collection("friends").add({
            friend: id,
            name: user.displayName,
            photo: user.photoURL,
        });
        db.collection("users").doc(idd).collection("chats").add({
            friend: id,
            name: user.displayName,
            photo: user.photoURL,
            friendRoomId: null,
            lastMessage: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(docRef => {
            setFri(docRef.id);
        });
    }
    const reject = () => {
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
                    <CancelIcon onClick={reject} />
                </div>
            </div>
        </div>
    )
}

export default Request
