import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      beerList: [],
      page: 2,
      statusData: true
  },
  mutations: {
      firstLoadBeerList(state,data){
          state.beerList = data;
      },
      
      nextLoadBeerList(state, data){
          if(data != 0){
                data.forEach(item => state.beerList.push(item))
                state.page = ++state.page
          }
          else state.statusData = false
      },
      
      saveEditListItem(state,data){
          let index = state.beerList.findIndex(item => item.id == data.id)
          state.beerList[index] = Object.assign(state.beerList[index], data.editedItem)
      },
      
      deleteListItem(state,id){
          state.beerList = state.beerList.filter(item => item.id !== id)
      }
  },
  actions: {
      firstLoadBeerList({commit}){
          return new Promise(function(resolve,reject){
              axios
                .get('https://api.punkapi.com/v2/beers?page=1&limit=25')
                .then(response => {
                    commit('firstLoadBeerList', response.data);
                    resolve();
                })
          })
      },
      
      nextLoadBeerList({commit,state}){
          return new Promise(function(resolve,reject){
              axios
                .get('https://api.punkapi.com/v2/beers',{
                        params: {
                            page: state.page,
                            limit: 25
                        }
                }).then(response => {
                    commit('nextLoadBeerList', response.data);
                    resolve();
                })
          })
      },
      
      saveEditListItem({commit}, data){
          return new Promise(function(resolve,reject){
              commit('saveEditListItem', data)
              resolve();
          })
      },
      
      deleteListItem({commit}, id){
          return new Promise(function(resolve,reject){
              commit('deleteListItem',id)
              resolve();
          })
      }
  }
})
