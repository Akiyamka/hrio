import { messageTypes } from './../../constants';
import { employersAPI } from './api';

export function readAllEmploeers({ commit }) {
  return employersAPI.readAll().then(data => {
    commit('setEmploeers', { emploeers: data });
  });
}

export function createEmploeer({ commit }, employee) {
  return employersAPI
    .create(employee)
    .then(id => {
      const newData = { id };
      commit('updateEmploeer', { id: employee.id, newData });
      commit('showMessage', {
        type: messageTypes.SUCCSESS,
        message: `Сотрудник ${employee.name} создан`,
      });
    })
    .catch(error => {
      commit('showMessage', {
        type: messageTypes.ERROR,
        message: [
          `Произошла ошибка, сотрудник ${employee.name} не создан`,
          error,
          'at createEmploeer',
        ],
      });
    });
}

export function readEmploeer({ commit }, employee) {
  return employersAPI
    .read(employee)
    .then(newData => {
      commit('setEmploeer', newData);
    })
    .catch(error => {
      commit('showMessage', {
        type: messageTypes.ERROR,
        message: [
          `Произошла ошибка, сотрудник ${employee} не может быть прочитан`,
          error,
          'at readEmploeer',
        ],
      });
    });
}

export function editEmploeer({ commit }, employee) {
  return employersAPI
    .update(employee)
    .then(id => {
      const newData = { id };
      commit('updateEmploeer', { id: employee.id, newData });
      commit('showMessage', {
        type: messageTypes.SUCCSESS,
        message: `Сотрудник ${employee.name} сохранен`,
      });
    })
    .catch(error => {
      commit('showMessage', {
        type: messageTypes.ERROR,
        message: [
          `Произошла ошибка, сотрудник ${employee.name} не сохранен`,
          error,
          'at editEmploeer',
        ],
      });
    });
}
