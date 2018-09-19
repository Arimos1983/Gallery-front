import axios from 'axios'


export default class AuthService{

    constructor(){

        axios.defaults.baseURL = 'http://localhost:8000/api/'
        this.setAxiosDefaultAuthorizationHeader();

    }
    login(email,password){
           
        return axios.post('auth/login', {email, password})
        .then(response=>{
            localStorage.setItem("token", response.data.access_token);
            this.setAxiosDefaultAuthorizationHeader();
        })
    }

    setAxiosDefaultAuthorizationHeader(){
        const token = localStorage.getItem("token");
        if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }

    register(newUser){
        return axios.post('auth/register', newUser)
        .then(response=>{
            localStorage.setItem("token", response.data.access_token);
            this.setAxiosDefaultAuthorizationHeader();
        })
    }

    isAuthenticated(){
        return !!localStorage.getItem("token");
    }

    logout() {
        axios.post('auth/logout')
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
    }


}

export const authService = new AuthService()