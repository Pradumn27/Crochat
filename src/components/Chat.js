import React from 'react'
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import { Call, Mic, VideoCall } from '@material-ui/icons';
import Message from "./Message"
import { Avatar } from '@material-ui/core';

export default function Chat() {
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
                <input placeholder="type message..." type="text"></input>
                <Mic/>
            </div>
        </div>
    )
}
