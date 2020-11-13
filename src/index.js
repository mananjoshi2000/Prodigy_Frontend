import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider, Cookies,useCookies } from 'react-cookie';
import GoogleLogin from 'react-google-login';
import Home from './Home.js';
import {Button, Grid, Box} from '@material-ui/core';

require('dotenv').config();

const Connect = () => {

  const [cookie, setCookie] = useCookies(['']);
  const cookies = new Cookies();
  const userCookie=cookies.get('userCookie');
  const [user,setUser]=useState(userCookie?true:false);
  console.log("From ENV:",process.env.CLIENT_ID);
  const client_Id=process.env.CLIENT_ID || "39603121170-058n9lara0vqjr2fomfv4nndgsd3aarm.apps.googleusercontent.com";
  
  const responseGoogle = (response)=>{
      console.log("Success");
      console.log(response);
      let authCookie={
        accessToken:response.accessToken,
        tokenId:response.tokenId,
        email:response.profileObj.email,
        name:response.profileObj.name,
        GID:response.googleId
      }
      console.log(authCookie);
      setCookie('userCookie',authCookie);

      setUser(true);

  }

  const fail = (res)=>{
    console.log("Failed ",res);
  }

 return (
    <CookiesProvider>
          <React.StrictMode>
            {user ? <Home/> : 

              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                fullWidth
                style={{backgroundColor:"LightBlue",height:100+'vh'}}
              >
                <Grid item xs={4} style={{minHeight:33+'vh', minWidth:100+'%'}}>
                </Grid>

                <Grid 
                    item xs={4} 
                    style={{ minHeight:33+'vh',minWidth:100+'%', display:'flex', justifyContent:'center', alignItems:'start'}}
                >    
                    <Box style={{textAlign:'center'}}>
                      <h1 style={{fontFamily: 'Julius Sans One',fontSize:50+'px',color:"black"}}>Prodigy
                        <p style={{fontFamily: 'Julius Sans One',fontSize:13+'px',color:"black"}}><strong>A place to collaborate</strong></p>
                      </h1>
                      <GoogleLogin
                        clientId={client_Id}
                        onSuccess={responseGoogle}
                        onFailure={fail}
                      >
                        <strong>Sign in with Google</strong>
                      </GoogleLogin>
                    </Box>
                </Grid>

                <Grid item xs={4} style={{minHeight:33+'vh', minWidth:100+'%'}}>
                    
                </Grid>
            </Grid>
          }
          </React.StrictMode>
    </CookiesProvider>
  );
};

ReactDOM.render(<Connect />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
