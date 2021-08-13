import { Button } from '@material-ui/core';
import React,{useState,useEffect} from 'react';
import './Login.css';
import { auth, provider } from '../Firebase';
import { actionTypes } from '../StateReducer/Reducer';
import { useStateValue } from '../StateReducer/StateProvider';
import First from "../First/First";

function Login() {
    const [ap,setAp] = useState(true);
    const [, dispatch] = useStateValue();
    const signIn = () => {
        auth.setPersistence('session').then(() => {
            auth.signInWithPopup(provider)
                .then((result) => {
                    dispatch({
                        type: actionTypes.SET_USER,
                        user: result.user,
                    });
                })
                .catch((error) => alert(error.message))
        });
    }
    useEffect(()=>{
        if(window.sessionStorage.getItem("app")){
          setAp(true);
        }
        else{
          setAp(false);
        }
      },[])
    return (
        <>{ap?(
        <div className="login">
            <div className="login_container">
                <div className="login_text">
                    <h1>Sign in</h1>
                </div>
                <Button type="submit" onClick={signIn}>Sign in With Google</Button>
            </div>
        </div>):<First />
        }
        </>
    );
}

export default Login