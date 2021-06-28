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
            </div>
            <div className="chatfooter">
                <EmojiEmotionsOutlinedIcon/>
                <input placeholder="type message..." type="text"></input>
                <Mic/>
            </div>
        </div>
    )
}
