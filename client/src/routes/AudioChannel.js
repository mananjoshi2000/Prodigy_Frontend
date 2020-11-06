import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { CookiesProvider, Cookies,useCookies } from 'react-cookie';
import{ Card,CardContent,CardMedia,Button,Typography} from '@material-ui/core';

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

const Video = (props) => {
    const ref = useRef();
    console.log("From Video : ",props.peerobj.peerID);
    useEffect(() => {
        props.peerobj.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);


    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const AudioChannel = (props) => {

    const cookies = new Cookies();
    const userCookie=cookies.get('userCookie');

    console.log(userCookie);
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = props.room;

    const userDetail={
        room:roomID,
        name:userCookie.name,
        GID:userCookie.GID
    }
    
    useEffect(() => {
       
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", userDetail);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach((X) => {
                    if(X.socketID!==socketRef.current.id){
                        const peer = createPeer(X.socketID, socketRef.current.id, stream);
                        peersRef.current.push({
                            peerID: X.socketID,
                            peer,
                            name:X.name,
                            GID:X.GID
                        })
                        peers.push({peerID: X.socketID,peer:peer,name:X.name,GID:X.GID});
                    }
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                    name:payload.name,
                    GID:payload.GID
                })

                const obj={
                    peerID: payload.callerID,
                    peer:peer,
                    name:payload.name,
                    GID:payload.GID
                }
                if(!peers.includes(obj)){
                    setPeers(users => [...users, obj]);
                }
                
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });

            socketRef.current.on("user left",id=>{
                const peerOBJ=peersRef.current.find((p)=>p.peerID===id);
                if(peerOBJ){
                    peerOBJ.peer.destroy();
                }

                const remaining=peersRef.current.filter((row)=>row.peerID!==id);
                peersRef.current=remaining;
                setPeers(remaining);
                console.log("Remaining : ",peers);
            });
        })
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            config: {
                iceServers: [
                    {
                        urls: "stun:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    },
                    {
                        urls: "turn:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    }
                ]
            },
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal, name:userCookie.name, GID:userCookie.GID})
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            config: {
                iceServers: [
                    {
                        urls: "stun:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    },
                    {
                        urls: "turn:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    }
                ]
            },
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }
   
    return (
        <Container>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            <h1>{userCookie.name}</h1>

            {peers.map((row) => {
                return(
                    <div>
                        <Video key={row.peerID} peerobj={row} />
                        <h1>{row.name}</h1>
                        {console.log("Fired")}
                        { console.log("Peers List : ",peers)}
                    </div>
                )
            })}
        </Container>
    );
};





export default AudioChannel;
