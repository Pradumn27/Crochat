import React from 'react'
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import { Mic } from '@material-ui/icons';
import Message from "./Message"

export default function Chat() {
    return (
        <div className="chat">
            <div className="chatheader">
                hbhs
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
                <input placeholder="type message..." type="text"></input>
                <Mic/>
            </div>
        </div>
    )
}
