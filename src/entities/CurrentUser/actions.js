import { messageTypes } from './../../constants';
import { authAPI } from './api';

export function authUser({ commit }) {
  authAPI
    .signIn()
    .then(currentUser => {
      commit('setCurrentUser', { currentUser });
    })
    .catch(error => {
      console.debug(error);
      commit('showMessage', {
        type: messageTypes.ERROR,
        message: error.code,
      });
    });
}
