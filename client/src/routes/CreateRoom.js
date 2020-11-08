import React from "react";
import { v1 as uuid } from "uuid";
import {Button} from '@material-ui/core';

const CreateRoom = (props) => {
    
    function create() {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }

    return (
        <div style={{margin:30+'px'}}>
            <Button size="large" className="room-button" variant="contained" color="primary" onClick={create}>Create New Doc</Button>
        </div>
    );
};

export default CreateRoom;
