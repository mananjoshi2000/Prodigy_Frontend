import React,{useState,useEffect} from 'react'
import AudioChannel from './AudioChannel';
import { unmountComponentAtNode } from "react-dom";
import { v1 as uuid } from "uuid";
import Container from '@material-ui/core/Container';
import { CookiesProvider, Cookies,useCookies } from 'react-cookie';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import App from './App';
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { QuillBinding } from 'y-quill'
import Quill from 'quill'
import QuillCursors from 'quill-cursors'

export default function Room(props) {
    const roomID = props.match.params.roomID;

    Quill.register('modules/cursors', QuillCursors)

    const ydoc = new Y.Doc()

    const cookies = new Cookies();
    const userCookie=cookies.get('userCookie');

    const username=userCookie.name;

    const provider = new WebsocketProvider('wss://shielded-sierra-61478.herokuapp.com',`${roomID}`, ydoc)
    const type = ydoc.getText(`${roomID}`);

    useEffect(()=>{
        const EditorContainer = document.getElementById("editor");

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

        // @ts-ignore
        window.example = { provider, ydoc, type, binding, Y }
    });
    

    return (
            <div>
                <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
                >
                    <Grid item xs={2} style={{maxHeight:100+'vh'}}>
                        <AudioChannel room={roomID} style={{height:'inherit'}}/>
                    </Grid>
                    <Grid item xs={7}>
                        <Card>
                            <div id="editor"></div>
                        </Card>
                    </Grid>
                    <Grid 
                        item 
                        xs={3} 
                        style={{height:100+'%'}}
                        alignItems="end"
                    >
                        <App/>
                    </Grid>
                </Grid>
            </div>
    )
}
