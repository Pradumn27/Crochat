import React,{useState} from 'react'
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import { Call, Mic, VideoCall } from '@material-ui/icons';
import Message from "./Message"
import "./Chat.css"
import { Avatar } from '@material-ui/core';

export default function Chat() {
    const [inp,setInp]=useState('');
    const sendMessage = (e) =>{
        e.preventDefault();
        setInp("");
    }
    return (
        <div className="chat">
            <div className="chatheader">
                <Avatar />
                <h3>Group ka Naam</h3>
                <div className="calls">
                    <Call/>
                    <VideoCall/>
                </div>
            </div>
            <div className="messages">
                <Message/>
                <Message cl="mess_reciever"/>
                <Message/>
                <Message cl="mess_reciever"/>
                <Message cl="mess_reciever"/>
                <Message/>
                <Message/>
                <Message/>
                <Message cl="mess_reciever"/>
                <Message/>
                <Message cl="mess_reciever"/>
            </div>
            <div className="chatfooter">
                <EmojiEmotionsOutlinedIcon/>
                <form>
                <input class="inp" placeholder="type message..."  value={inp} onChange={(e)=>{setInp(e.target.value)}} type="text"></input>
                <button class="but" onClick={sendMessage} type="submit"> Send a Message</button>
                </form>
                <Mic/>
            </div>
        </div>
    )
}
