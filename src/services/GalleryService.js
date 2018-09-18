import axios from 'axios'

export default class GalleryService{

    constructor(){

        axios.defaults.baseURL = 'http://localhost:8000/api'
    }

    getAll(){
        return axios.get('galleries')
    }

    get($id){
        return axios.get( `galleries/${$id}`)
    }


}

export const galleryService = new GalleryService()