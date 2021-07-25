import React,{useState,useEffect} from 'react'
import { useStateValue } from './StateReducer/StateProvider';
import db from "./Firebase";
import Loading from "./Loading/Loading";
import Routess from './routess';

function UserChecker() {
    const [isLoading, setIsLoading] = useState(true);
    const [idd, setIdd] = useState('');
    const [{ user },] = useStateValue();
    async function UserCheck() {
        const event = await db.collection("users").where("user", "==", user?.uid).get();
        if (event._delegate._snapshot.docChanges.length === 0) {
            db.collection('users').add({
                user: user.uid,
                name: user.displayName,
                photoUrl: user.photoURL,
                soc:null
            }).then(docRef => {
                setIdd(docRef.id);
                setIsLoading(false);
            })
        }
        else if (event._delegate._snapshot.docChanges.length > 0) {
            db.collection("users").where("user", "==", user?.uid).get().then((querySnapshot) => {
                querySnapshot.docs.map(doc => {
                    setIdd(doc.id);
                    setIsLoading(false);
                })
            })
        }
    }
    useEffect(() => {
        UserCheck();
    }, [])
    return (
        <>
        {isLoading ? <Loading /> : (
        <>
          <Routess id={idd}/>  
        </>)}
        </>
    )
}

export default UserChecker;
