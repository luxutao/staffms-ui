import axios from 'axios';

let host = '';


export default {
    login:host + '/api/auth/login',
    getusers:host + '/api/auth/getusers',
    adduser:host + '/api/auth/adduser',
    deluser:host + '/api/auth/deluser',
    resetpassword:host + '/api/auth/resetpassword',
}