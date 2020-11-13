import { DesktopWindowsRounded } from "@material-ui/icons";
import React from "react";
import { CookiesProvider, Cookies,useCookies } from 'react-cookie';
import{Button} from '@material-ui/core';

const Stream = (props) => {
  const jitsiContainerId = "jitsi-container-id";
  const [jitsi, setJitsi] = React.useState({});
  const [isStream,setStream]=React.useState(false);

    const cookies = new Cookies();
    const userCookie=cookies.get('userCookie');

  const loadJitsiScript = () => {
    let resolveLoadJitsiScriptPromise = null;

    const loadJitsiScriptPromise = new Promise(resolve => {
      resolveLoadJitsiScriptPromise = resolve;
    });

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => resolveLoadJitsiScriptPromise(true);
    document.body.appendChild(script);

    return loadJitsiScriptPromise;
  };

  const initialiseJitsi = async () => {
    if (!window.JitsiMeetExternalAPI) {
      await loadJitsiScript();
    }

    const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", {
      parentNode: document.getElementById(jitsiContainerId),
      roomName: props.room,
      userInfo: {
        displayName: userCookie.name,
      },
      interfaceConfigOverwrite: { 
        TILE_VIEW_MAX_COLUMNS: 1,
        DEFAULT_BACKGROUND: '#ffffff', 
        HIDE_DEEP_LINKING_LOGO: true,
        HIDE_INVITE_MORE_HEADER: true,
        MOBILE_APP_PROMO: false,
      },
    });

    
    _jitsi.addEventListener('readyToClose', () => {
      console.log('opaaaaa');
      setStream(false);
    });


    setJitsi(_jitsi);
  };

  

  React.useEffect(() => {
    if(isStream){
      initialiseJitsi();
    }
    
    
    return () => jitsi?.dispose?.();
  },[isStream]);

  const Handle=()=>{
    setStream(true);
  }


  return (isStream? 
              <div id={jitsiContainerId} style={{ height: 720, width: "95%", margin:"4%" }} />:
              <Button variant="contained" color="primary" onClick={Handle} style={{margin:"8%"}}>
                        Join Stream
              </Button>
  )
};

export default Stream;
