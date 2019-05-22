import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    charactersData: [],
    charactersDataSyncing: true,
    charactersDataSyncingErrors: [],
    pagination: {
      currentPage: 1,
      perPage: 20,
      totalRecords: 0
    }
  },
  mutations: {
    SET_CHARACTERS: (state, characters) => {
      state.charactersData.push(...characters)
    },
    SET_PAGINATION: (state, paginationSetting) => {
      state.pagination = { ...state.pagination, ...paginationSetting }
    },
    ADD_STARSHIP: (state, { starship, name }) => {
      state.charactersData.forEach((character) => {
        if (character.name === name) {
          if (!character.starshipsData) {
            character.starshipsData = []
          }
          character.starshipsData.push(starship)
        }
      })
    },
    SET_LOADING_STATE: (state, isLoading) => {
      state.charactersDataSyncing = isLoading
    },
    SET_SYNC_ERROR: (state, error) => {
      state.charactersDataSyncingErrors.push(error)
    }
  },
  actions: {
    setCharacters ({ commit }, characters) {
      commit('SET_CHARACTERS', characters)
    },
    setPagination ({ commit }, paginationSettings) {
      commit('SET_PAGINATION', paginationSettings)
    },
    syncData ({ commit }, url) {
      const store = this
      axios.get(url).then(response => {
        commit('SET_CHARACTERS', response.data.results)
        commit('SET_PAGINATION', { totalRecords: response.data.count })
        response.data.results.forEach((character, index) => {
          if (character.starships.length > 0) {
            character.starships.forEach((url) => {
              if (url) {
                axios.get(url)
                  .then(response => {
                    commit('ADD_STARSHIP', { starship: response.data, name: character.name })
                  })
              }
            })
          }
        })
        if (response.data.next) {
          store.dispatch('syncData', response.data.next)
        } else {
          commit('SET_LOADING_STATE', false)
        }
      })
        .catch(error => {
          commit('SET_SYNC_ERROR', error.message)
        })
    },
    syncStarShip ({ commit }, url, characterId) {

    }
  },
  getters: {
    getCharacters: state => state.charactersData.filter((character, index) => index < state.pagination.currentPage * state.pagination.perPage && index >= (state.pagination.currentPage - 1) * state.pagination.perPage),
    getSingleCharacter: state => name => state.charactersData.filter(character => character.name === name)[0],
    getPaginationSetting: state => key => state.pagination[key],
    getPaginationSettings: state => state.pagination,
    isCharactersDataSyncing: state => state.charactersDataSyncing,
    getSyncErrors: state => state.charactersDataSyncingErrors
  }

})
