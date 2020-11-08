import axios from 'axios';

const instance = axios.create({
    baseURL:'https://smart-doc-chat-backend.herokuapp.com',
});

export default instance;
