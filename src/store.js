import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// function getData (url, target) {
//   axios.get(url)
//     .then(response => {
//       target = response.data
//     })
// }

export default new Vuex.Store({
  state: {
    charactersData: [],
    pagination: {
      currentPage: 0,
      perPage: 20,
      totalRecords: 0
    }
  },
  mutations: {
    SET_CHARACTERS: (state, characters) => {
      state.charactersData = characters
    },
    SET_PAGINATION: (state, paginationSetting) => {
      state.pagination = { ...state.pagination, ...paginationSetting }
    },
    ADD_STARSHIP: (state, { starships, index }) => {
      if (!state.charactersData[index].starshipsData) {
        state.charactersData[index].starshipsData = []
      }
      state.charactersData[index].starshipsData.push(starships)
    }
  },
  actions: {
    setCharacters ({ commit }, characters) {
      commit('SET_CHARACTERS', characters.map((character, index) => ({ ...character, ...{ id: index } })))
    },
    setPagination ({ commit }, paginationSettings) {
      commit('SET_PAGINATION', paginationSettings)
    },
    syncData ({ commit }) {
      axios.get(process.env.VUE_APP_GET_CHARACTERS_API_URL).then(response => {
        commit('SET_CHARACTERS', response.data.results.map((character, index) => ({ ...character, ...{ id: index } })))
        response.data.results.forEach((character, index) => {
          if (character.starships.length > 0) {
            character.starshipsData = []
            character.starships.forEach(url => {
              axios.get(url)
                .then(response => {
                  character.starshipsData.push(response.data)
                  commit('ADD_STARSHIP', { starships: response.data, index: index })
                })
            })
          }
        })
      })
    }
  },
  getters: {
    getCharacters: state => state.charactersData,
    getSingleCharacter: state => id => state.charactersData.filter(character => character.id === +id)[0],
    getPaginationSetting: state => key => state.pagination[key],
    getPaginationSettings: state => state.pagination
  }

})
