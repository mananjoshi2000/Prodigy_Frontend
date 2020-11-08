import Chat from './Chat'
import {useEffect,useState} from 'react';
import Pusher from 'pusher-js';
import axios from './axios';
function App() {

  const [messages,setMessages] = useState([]);
  useEffect(()=>{

    axios.get('/messages/sync').then(res=>{
      setMessages(res.data);
    });
  },[]);
  useEffect(()=>{
    const pusher = new Pusher('ca6ea51aa3cef8b24a2b', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage)=> {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    };
  },[messages]);

  
  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
      <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
