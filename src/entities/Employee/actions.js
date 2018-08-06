import { messageTypes } from './../../constants';
import { employersAPI } from './api';

export function readAllEmploeers({ commit }) {
  return employersAPI.readAll().then(data => {
    commit('setEmploeers', { emploeers: data });
  });
}

export function createEmploeer({ commit }, employee) {
  const { departmentId } = employee;
  if (departmentId === undefined) {
    commit('showMessage', {
      type: messageTypes.ERROR,
      message: [
        `Произошла ошибка, сотрудник ${employee.name} не создан`,
        'You must specify departmentId for employer',
        'at createEmploeer',
      ],
    });
  }

  return employersAPI
    .create(employee, departmentId)
    .then(id => {
      commit('updateEmploeer', { id, employee });
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
  const employeeId = employee.id;
  return employersAPI
    .update(employee)
    .then(() => {
      commit('updateEmploeer', { id: employeeId, newData: employee });
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
