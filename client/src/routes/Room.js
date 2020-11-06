import React,{useState,useEffect} from 'react'
import AudioChannel from './AudioChannel';
import { unmountComponentAtNode } from "react-dom";
import { v1 as uuid } from "uuid";
import Container from '@material-ui/core/Container';
import { CookiesProvider, Cookies,useCookies } from 'react-cookie';

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { QuillBinding } from 'y-quill'
import Quill from 'quill'
import QuillCursors from 'quill-cursors'

export default function Room(props) {
    const [isAudio,setAudio]=useState(false);
    const roomID = props.match.params.roomID;
    console.log(isAudio);
    const Join=()=>{
        setAudio(true);
    }
    const Leave=()=>{
        unmountComponentAtNode(document.getElementById('Audio'))
        setAudio(false);
    }

    Quill.register('modules/cursors', QuillCursors)

    const ydoc = new Y.Doc()

    const cookies = new Cookies();
    const userCookie=cookies.get('userCookie');

    const username=userCookie.name;

    const provider = new WebsocketProvider('wss://shielded-sierra-61478.herokuapp.com',`${roomID}`, ydoc)
    const type = ydoc.getText(`${roomID}`);


    // const EditorContainer = document.createElement('div')

    useEffect(()=>{
        const EditorContainer = document.getElementById("editor");

        // EditorContainer.setAttribute('id', 'editor')
        // document.body.insertBefore(EditorContainer, null)



        var toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
        
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
        
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean']  
        ];

        var editor = new Quill(EditorContainer, {
            modules: {
            cursors : true,
            toolbar:toolbarOptions,
            history: {
                userOnly: true
            }
            },
            placeholder: 'Start collaborating...',
            theme: 'snow' // or 'bubble'
        })   

        const binding = new QuillBinding(type, editor, provider.awareness)
        //console.log(provider.awareness);
        if(!username)username='Anonymous';
        provider.awareness.setLocalStateField('user', {
            name: `${username}`,
            color: 'blue'
        });

        //   const connectBtn = document.getElementById('y-connect-btn')
        //   connectBtn.addEventListener('click', () => {
        //     if (provider.shouldConnect) {
        //       provider.disconnect()
        //       connectBtn.textContent = 'Connect'
        //     } else {
        //       provider.connect()
        //       connectBtn.textContent = 'Disconnect'
        //     }
        //   })

        // @ts-ignore
        window.example = { provider, ydoc, type, binding, Y }
    });
    

    return (
        <div>
            <button onClick={Join} >Join Audio Channel</button>
            <button onClick={Leave}>Leave Audio Channel</button>
            <Container id="Audio">
            {isAudio?<AudioChannel key={uuid()} room={roomID}/>:null}
            </Container>
            <div id="editor"></div>
        </div>
    )
}







