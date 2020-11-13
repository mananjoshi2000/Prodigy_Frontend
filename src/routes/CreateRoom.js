import React,{useState,useEffect} from "react";
import { v1 as uuid } from "uuid";
import {Button, Grid, Box} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { CookiesProvider, Cookies,useCookies } from 'react-cookie';
import axios from "axios";

const CreateRoom = (props) => {
    
    function create() {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }

    function open(doc){
        props.history.push(`/room/${doc.doc_id}`);
    }

    const cookies = new Cookies();
    const userCookie=cookies.get('userCookie');

    const [docs,setDocs]=useState([]);

    const url = (process.env.NODE_ENV==="production" ? "https://thawing-dawn-49846.herokuapp.com/" : "http://localhost:5000/");

    useEffect(() => {
        axios.get(`${url}user_doc/byUser?GID=${userCookie.GID}`).then((res)=>{
            console.log(res.data);
            setDocs(res.data);
        })
    }, []);

    console.log("Doc List : ",docs);

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));

    const classes = useStyles();

    return (

        <Grid
            container
            container 
            spacing={1}
            fullWidth
            style={{backgroundColor:"Azure",height:100+'vh',padding:"2%"}}
        >
            <Grid 
                item xs={12} 
                style={{minWidth:100+'%', display:'flex', justifyContent:'center', alignItems:'start'}}
            >    
                <Box style={{textAlign:'center'}}>
                    <h1 style={{fontFamily: 'Julius Sans One',fontSize:50+'px',color:"black"}}>Prodigy
                        <p style={{fontFamily: 'Julius Sans One',fontSize:13+'px',color:"black"}}><strong>A place to collaborate</strong></p>
                    </h1>
                    <Button size="large" className="room-button" variant="contained" color="primary" onClick={create}>Create New Doc</Button>
                </Box>
            </Grid>

            {docs.map((doc,i)=>{
                return(
                    <Grid key={i} item xs={3} >
                        <Button key={i} onClick={()=>open(doc)}>
                            <Paper className={classes.paper}>
                                <h1>{doc.doc_name}
                                    <p style={{fontFamily: 'Julius Sans One',fontSize:13+'px',color:"black"}}><strong>{doc.doc_id}</strong></p>
                                </h1>
                            </Paper>
                        </Button>
                    </Grid>
                )
            })}


        </Grid>
    );
};

export default CreateRoom;
