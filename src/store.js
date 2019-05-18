import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// function getData (url, onLoad) {
//   axios.get(url)
//     .then(response => {
//       onLoad(response)
//     })
// }

export default new Vuex.Store({
  state: {
    charactersData: [],
    charactersDataSyncing: true,
    pagination: {
      currentPage: 0,
      perPage: 20,
      totalRecords: 0
    }
  },
  mutations: {
    SET_CHARACTERS: (state, characters) => {
      state.charactersData.push(...characters.map((character, index) => ({ ...character, ...{ id: index + state.charactersData.length } })))
    },
    SET_PAGINATION: (state, paginationSetting) => {
      state.pagination = { ...state.pagination, ...paginationSetting }
    },
    ADD_STARSHIP: (state, { starships, index }) => {
      if (!state.charactersData[index].starshipsData) {
        state.charactersData[index].starshipsData = []
      }
      state.charactersData[index].starshipsData.push(starships)
    },
    SET_LOADING_STATE: (state, isLoading) => {
      state.charactersDataSyncing = isLoading
    }
  },
  actions: {
    setCharacters ({ commit }, characters) {
      commit('SET_CHARACTERS', characters.map((character, index) => ({ ...character, ...{ id: index } })))
    },
    setPagination ({ commit }, paginationSettings) {
      commit('SET_PAGINATION', paginationSettings)
    },
    syncData ({ commit }, url) {
      const store = this
      axios.get(url).then(response => {
        commit('SET_CHARACTERS', response.data.results)
        // TODO: Fix starships id mashup
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
        if (response.data.next) {
          store.dispatch('syncData', response.data.next)
        } else {
          commit('SET_LOADING_STATE', false)
        }
      })
    }
  },
  getters: {
    getCharacters: state => state.charactersData,
    getSingleCharacter: state => id => state.charactersData.filter(character => character.id === +id)[0],
    getPaginationSetting: state => key => state.pagination[key],
    getPaginationSettings: state => state.pagination,
    isCharactersDataSyncing: state => state.charactersDataSyncing
  }

})
