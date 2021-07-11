import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import {auth,provider} from '../Firebase';
import { actionTypes } from '../StateReducer/Reducer';
import { useStateValue } from '../StateReducer/StateProvider';

function Login() {
    const [{},dispatch] = useStateValue();
    const signIn = () => {
        auth.setPersistence('local').then(()=>{auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => alert(error.message))});
    }
    return (
        <div className="login">
           <div className="login_container">
               {/* <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt=""/>  */}
                <div className="login_text">
                    <h1>Sign in</h1>
                </div>
                <Button type="submit" onClick={signIn}>Sign in With Google</Button>
           </div>
        </div>
    );
}

export default Login