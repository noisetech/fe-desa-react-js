import axios from "axios";

import Cookies from "js-cookie";

const Api = axios.create({
    
    //set endpoint API
    baseURL: 'http://127.0.0.1:8000/api',

    //set header axios
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});

Api.interceptors.response.use(function(response){
    return response;
}, (error) => {
    if (401 == error.response.status) {
        Cookies.remove('token');

         //remove user
         Cookies.remove('user');

         //remove permissions
         Cookies.remove('permissions');

         window.location = '/';
    } else if(403 === error.response.status) {
    
        //redirect "/forbidden"
        window.location = '/forbidden';

    }else {

        //reject promise error
        return Promise.reject(error);
    }
})


export default Api;