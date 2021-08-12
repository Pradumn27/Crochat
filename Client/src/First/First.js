import React, { useEffect, useState } from 'react'
import App from "../App"
import "./First.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from "./Footer"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function First() {
    const [app, setApp] = useState(false);
    useEffect(() => {
        AOS.init({ duration: 2500 });
        if (window.sessionStorage.getItem('app')) {
            setApp(true);
        }
    }, [])
    const setAppp = () =>{
        window.sessionStorage.setItem('app',true);
        setApp(true);
    }
    return (
        <>
            {app ? <App /> : (
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <div className="top">
                                <div className="backy">
                                    <nav>
                                        <img src="/Capture.jpg" />
                                        <h5 onClick={setAppp}>LOGIN</h5>
                                    </nav>
                                    <div className="body">
                                        <h1>HOW WOULD YOU LIKE TO...</h1>
                                        <h3>Talk to your friends, call them from the browser or even video call them or how about sharing your screen as well here's your one-stop solution.</h3>
                                        <a className="butn" href="#" onClick={setAppp}>Open in browser</a>
                                    </div>
                                </div>
                                <div className="en-invite">
                                    <div data-aos="fade-in" data-aos-once="false" className="invites">
                                        <img src="/invites.jpg"></img>
                                        <div className="side-invite">
                                            <h1>Invite your friends to a safe chatting environment</h1>
                                            <p>share your unique id with friends to add to your profile. Enjoy realtime chatting with friends...</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="en-invite bac">
                                    <div data-aos="fade-in" data-aos-once="false" className="invites">
                                        <div className="side-invite">
                                            <h1>Personalise your profile</h1>
                                            <p>that photo where you look really amazing how about that for a profile pic :)</p>
                                        </div>
                                        <img className="cha" src="/profile.jpg"></img>
                                    </div>
                                </div>
                                <div className="en-invite">
                                    <div data-aos="fade-in" data-aos-once="false" className="invites">
                                        <img src="/chat.jpg"></img>
                                        <div className="side-invite">
                                            <h1>Let's Hangout here then :)</h1>
                                            <p>chat along with your friends...</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="en-invite bac">
                                    <div data-aos="fade-in" data-aos-once="false" className="invites logg">
                                        <h1>So looks interesting?</h1>
                                        <h3>Click on Login Below :)</h3>
                                        <button className="btnn" onClick={setAppp}>LOGIN</button>
                                    </div>
                                </div>
                                <div className="foo">
                                    <Footer />
                                </div>
                            </div>
                        </Route>
                    </Switch>
                </Router>
            )}
        </>
    )
}

export default First