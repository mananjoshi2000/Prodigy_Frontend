import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider, Cookies,useCookies } from 'react-cookie';
import GoogleLogin from 'react-google-login';
import Home from './Home.js';
require('dotenv/types').config();

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
            {user ? <Home/> : <GoogleLogin
    clientId={client_Id}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={fail}
    
  />}
          </React.StrictMode>
    </CookiesProvider>
  );
};

ReactDOM.render(<Connect />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
