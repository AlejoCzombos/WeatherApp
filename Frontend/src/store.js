import {createStore} from 'vuex';

export const store = createStore({
    state: {
    modalIsOpen: false,
    isEditing: false,
    refreshDataTrigger: false,
    isInHome: true,
    isDay: true,
  },
  mutations: {
    toggleModal(state) {
      state.modalIsOpen = !state.modalIsOpen
    },
    modifyCities(state) {
      state.isEditing = !state.isEditing
    },
    checkRoute(state, routeName) {
      state.isInHome = routeName === 'Home'
    },
    refreshDataTrigger(state) {
      state.refreshDataTrigger = !state.refreshDataTrigger
    },
    setIsDay(state, time){
      state.isDay = time
    }
  },
  actions: {
    toggleModal(context) {
      context.commit('toggleModal')
    },
    modifyCities(context) {
      context.commit('modifyCities')
    },
    checkRoute(context, routeName) {
      context.commit('checkRoute', routeName)
    },
    refreshDataTrigger(context) {
      context.commit('refreshDataTrigger')
    },
    setIsDay(context, time){
      context.commit('setIsDay', time)
    }
  }
});