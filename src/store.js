import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
    SET_PAGINATION_PARAMETER: (state, paginationSetting) => {
      state.pagination = { ...state.pagination, ...paginationSetting }
    }
  },
  actions: {
    setCharacters ({ commit }, characters) {
      commit('SET_CHARACTERS', characters.map((character, index) => ({ ...character, ...{ id: index } })))
    },
    setPagination ({ commit }, paginationSettings) {
      commit('SET_CHARACTERS', paginationSettings)
    }
  },
  getters: {
    getSingleCharacter: state => id => state.charactersData.filter(character => character.id === id),
    getPaginationSetting: state => key => state.pagination[key],
    getPaginationSettins: state => state.pagination
  }

})
