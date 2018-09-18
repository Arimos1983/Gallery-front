import axios from 'axios'


export default class UserService{

    constructor(){
        axios.defaults.baseURL = 'http://localhost:8000/api'
    }

    get($id){
        return axios.get(`users/${$id}`)
    }
}

export const userService = new UserService()