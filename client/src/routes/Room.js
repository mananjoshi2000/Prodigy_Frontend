import React,{useState} from 'react'
import AudioChannel from './AudioChannel';
import { unmountComponentAtNode } from "react-dom";
import { v1 as uuid } from "uuid";
import Container from '@material-ui/core/Container';

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
    return (
        <div>
            <button onClick={Join} >Join Audio Channel</button>
            <button onClick={Leave}>Leave Audio Channel</button>
            <Container id="Audio">
            {isAudio?<AudioChannel key={uuid()} room={roomID}/>:null}
            </Container>
        </div>
    )
}
