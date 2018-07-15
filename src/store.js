import Vue from 'vue';
import Vuex from 'vuex';
import { generateUID } from './utils';
import { messageTypes } from './constants';
import employersAPI from './api/employers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allDepartments: [
      {
        name: 'Разработчики',
        emplyeers: [0, 1, 2],
        id: 0,
      },
      {
        name: 'Черезрабчики',
        emplyeers: [3, 4, 5],
        id: 1,
      },
    ],
    allEmplyeers: [
      { id: 0, name: 'Вася', surname: 'Пупкин', position: 'Руководитель' },
      { id: 1, name: 'Саша', surname: 'Печкин', position: 'Старший сотрудник' },
      {
        id: 2,
        name: 'Леся',
        surname: 'Коточкин',
        position: 'Младший сотрудник',
      },
      { id: 3, name: 'Кеша', surname: 'Сидоров', position: 'Стажер' },
      { id: 4, name: 'Паля', surname: 'Павлов', position: 'Стажер' },
    ],
  },
  getters: {
    getDepartmentEmploeers: state => department =>
      state.allEmplyeers.filter(empl => department.emplyeers.includes(empl.id)),
  },
  mutations: {
    addEmploeerToDepartment(state, { departmentId, employeeId }) {
      const department = state.allDepartments.find(d => d.id === departmentId);
      department.emplyeers.push(employeeId);
    },
    addEmploeerToAllEmplyeers(state, employee) {
      state.allEmplyeers.push(employee);
    },
    updateEmploeer(state, { id, newData }) {
      const emplyeerForUpdate = state.allEmplyeers.find(e => e.id === id);
      Object.assign(emplyeerForUpdate, newData);
    },
    showMessage(state, { type = messageTypes.WARNING, message }) {
      const showMsg = Array.isArray(message) ? message.join(', ') : message;
      console.log(type, showMsg);
    },
  },
  actions: {
    addEmploeerToDepartment({ commit }, selectedDepartment) {
      const Employee = name => ({
        name,
        surname: null,
        position: null,
        id: 'new_' + generateUID(),
      });

      const employee = Employee('Новый работник');

      commit('addEmploeerToAllEmplyeers', employee);
      commit('addEmploeerToDepartment', {
        employeeId: employee.id,
        departmentId: selectedDepartment.id,
      });

      return employee;
    },

    createEmploeer({ commit }, employee) {
      employersAPI
        .create(employee)
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
            ],
          });
        });
    },
  },
});
