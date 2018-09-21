import axios from 'axios'

export default class GalleryService{

    constructor(){

        axios.defaults.baseURL = 'http://localhost:8000/api'
    }

    getAll(){
        return axios.get('galleries')
    }

    get(id){
        return axios.get( `galleries/${id}`)
    }
    addGallery(gallery){
        return axios.post('galleries', gallery)
    }
    deleteGallery(id){
        return axios.delete(`galleries/${id}`)
    }
    getGallery(skip,search){
        return axios.get(`getmore?search=${search}&skip=${skip}`)
    }
    getUser(id,skip,search){
        return axios.get(`getuser/${id}?skip=${skip}&search=${search}`)
    }


}

export const galleryService = new GalleryService()