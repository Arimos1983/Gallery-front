import Vue from 'vue'
import Vuex from 'vuex'
import { authService } from '../services/AuthService'

Vue.use(Vuex);


const store = new Vuex.Store({

    state:{

        isAuthenticated: authService.isAuthenticated(),
    },

    getters:{
        
        getIsAuthenticated(state){
            return state.isAuthenticated;
        },
    },
    mutations:{

        setIsAuthenticated(state, data){
            state.isAuthenticated = data
        },

    },

    actions:{
        
        isAuthenticated(context){
         let data =  authService.isAuthenticated()
          context.commit('setIsAuthenticated', data)
        }
        
    }


})

export default store;