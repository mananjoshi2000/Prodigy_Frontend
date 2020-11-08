import React from "react";
import { v1 as uuid } from "uuid";
import {Button, Grid, Box} from '@material-ui/core';

const CreateRoom = (props) => {
    
    function create() {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }

    return (

        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            fullWidth
            style={{backgroundColor:"Azure",height:100+'vh'}}
        >
            <Grid item xs={4} style={{minHeight:30+'vh'}}>
            </Grid>

            <Grid 
                item xs={4} 
                style={{minHeight:30+'vh',minWidth:100+'%', display:'flex', justifyContent:'center', alignItems:'start'}}
            >    
                <Box style={{textAlign:'center'}}>
                    <h1 style={{fontFamily: 'Julius Sans One',fontSize:50+'px',color:"black"}}>Prodigy
                        <p style={{fontFamily: 'Julius Sans One',fontSize:13+'px',color:"black"}}><strong>A place to collaborate</strong></p>
                    </h1>
                    
                    <Button size="large" className="room-button" variant="contained" color="primary" onClick={create}>Create New Doc</Button>
                    {/* <Button size="large" className="room-button" variant="contained" color="primary">Dashboard</Button> */}
                </Box>
            </Grid>
            
            <Grid item xs={4} style={{minHeight:30+'vh'}}>
                
            </Grid>
            </Grid>
    );
};

export default CreateRoom;
