import React, { useState ,useEffect,useRef} from 'react'
import './Chat.css'
import {Avatar,IconButton, Button} from "@material-ui/core";
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import AttachFile from '@material-ui/icons/AttachFile';
import { CookiesProvider, Cookies,useCookies } from 'react-cookie';
import io from "socket.io-client";
import axios from "axios";

 
function Chat(props) {
    const cookies = new Cookies();
    const userCookie=cookies.get('userCookie');
    const userName=userCookie.name;
    const socketRef = useRef();
    const [input,setInput] = useState('');
    const [messages,setMessages]=useState([]);
    console.log("Test");

    // const url = (process.env.NODE_ENV==="production" ? "https://thawing-dawn-49846.herokuapp.com/" : "http://localhost:5000/");
    const url = "https://thawing-dawn-49846.herokuapp.com/"
    console.log(process.env.NODE_ENV,url);

    const userDetail={
        room:props.roomID,
        name:userCookie.name,
        GID:userCookie.GID,
        imgURI:userCookie.url
    }

    window.onbeforeunload =()=>{
        if(socketRef.current){
            socketRef.current.close();
        } 
    }

    useEffect(() => {
       
        axios.get(`${url}chat?room=${props.roomID}`).then((res)=>{
            console.log(res.data);
            setMessages(res.data);
        })


        socketRef.current=io.connect(url);
        socketRef.current.emit("join chat room",userDetail);

        console.log("Inside UseEffect : ",messages);

        socketRef.current.on('recevied msg',(data)=>{
            console.log("yes received..");
            setMessages((msgs)=>[...msgs,data]);
            console.log(messages);
        });

    },[]);

    
    const toggleChat = ()=>{
        var disp = document.querySelector('.chat__window').style.display;
        if(disp === 'none')
        {
            document.querySelector('.chat__window').style.display = 'flex';
        }
        else
        document.querySelector('.chat__window').style.display = 'none';
    }
    const sendMessage = (e)=>{
        e.preventDefault();
        const obj={
            userName,
            photoUri:"123",
            msg:input,
            time:new Date,
            room:props.roomID
        }
        socketRef.current.emit('send msg',obj);
    //     axios.post(`${url}chat`,obj,{headers: {
    //     'Content-Type': 'application/json'
    //   }}).then((res)=>{
    //         console.log(res);
    //     })
        setInput('');
    }


    return (

        <div className = 'chat'>
          <div className = 'chat__window'>
            <div className="chat__header">
            <Avatar  src = ""/>
            <p>General Chat</p>
            </div>

            <div className="chat__body">
                {messages.map((message,i)=>{
                    return(
                        <p key={i} className={`chat__message ${userCookie.name === message.userName && 'chat__receiver'}`}>
                            <span className='chat__name'>{message.userName}</span>
                            {message.msg}
                            <span className='chat__timestamp'>{message.time}</span>
                        </p>
                    )
                })}
                
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
                <input type='file' multiple hidden id = 'file'></input>
                <label htmlFor='file'>
                <IconButton color = 'primary' component = "span">
                  <AttachFile>
                  </AttachFile>
                </IconButton>  
                </label>
                
                
            </div>
        
             
          </div>
          <div className='chat__modal' onClick={toggleChat}>
             <IconButton>
                 <ChatBubbleOutline/>
             </IconButton>
            </div>
        </div>  
    )
}

export default Chat
