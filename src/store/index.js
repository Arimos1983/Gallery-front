import Vue from 'vue'
import Vuex from 'vuex'
import { authService } from '../services/AuthService'

Vue.use(Vuex);


const store = new Vuex.Store({

    state:{

        isAuthenticated: false 
    },

    getters:{
        
        getIsAuthenticated(state){
            return state.isAuthenticated;
        }
    },
    mutations:{

        setIsAuthenticated(state, data){
            state.isAuthenticated = data
        },
        logout(state){
            state.isAuthenticated = false
        }

    },

    actions:{
        
        isAuthenticated(context){
         let data =  authService.isAuthenticated()
          context.commit('setIsAuthenticated', data)
        },
        logout(context){
            context.commit('logout')
        }
    }


})

export default store;