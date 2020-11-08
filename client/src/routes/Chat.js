import React, { useState } from 'react'
import './Chat.css'
import {Avatar,IconButton} from "@material-ui/core";
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import AddIcCallOutlinedIcon from '@material-ui/icons/AddIcCallOutlined';
import axios from './axios';
import { CookiesProvider, Cookies,useCookies } from 'react-cookie';

 
function Chat({ messages}) {
    const cookies = new Cookies();
    const userCookie=cookies.get('userCookie');
    const userName=userCookie.name;
    console.log(userName);
    const [input,setInput] = useState('');

    const sendMessage = async (e)=>{
        e.preventDefault();
        await axios.post('/messages/new', {
            message:input,
	        name: userName, // add the authorized user's name
            timestamp: "Just now", //add the timestamp from the authorized 
	        received: true                
        });
        setInput('');
    }
    return (
        <div className = 'chat'>
            <div className="chat__header">
            <Avatar  src = ""/>
            <p>Room Name</p>
            </div>

            <div className="chat__body">
                {messages.map(message=>(
                    <p className={`chat__message ${userCookie.name === message.name && 'chat__receiver'}`}>
                        <span className='chat__name'>{message.name}</span>
                        {message.message}
                        <span className='chat__timestamp'>{message.timestamp}</span>
                    </p>
                ))}
                
            </div>
            <div className='chat__footer'>
                <IconButton>
                    <EmojiEmotionsOutlinedIcon></EmojiEmotionsOutlinedIcon>
                </IconButton>
                <form>
                    <input value = {input} onChange = { (e)=> setInput(e.target.value)} placeholder='Type a message' type='text'> 
                    </input>
                    <button onClick = {sendMessage} type = 'submit'>Send message</button>
                </form>
                <IconButton>
                  <AddIcCallOutlinedIcon></AddIcCallOutlinedIcon>
                </IconButton>
            </div>
            
        </div>
    )
}

export default Chat
