import React from 'react'
import { Avatar } from '@material-ui/core'

export default function SideChat() {
    return (
        <div className="sidechat">
            <Avatar src="https://avatars.dicebear.com/api/human/1234.svg" />
            <div className="names">
                <h4>Naam</h4>
                <p>aur bhaiii kya haal hai??</p>
            </div>
        </div>
    )
}
