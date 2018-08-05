import Vue from 'vue';
import Vuex from 'vuex';
import { generateUID } from './utils';
import { messageTypes } from './constants';

// API Interface
import { employersAPI } from './api/employers';
import { departmentsAPI } from './api/departments';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allDepartments: [],
    allEmplyeers: [],
    employer: {},
  },
  getters: {
    getDepartmentEmploeers: state => department =>
      state.allEmplyeers.filter(empl => department.emplyeers.includes(empl.id)),
  },
  mutations: {
    setDepartments(state, { departments }) {
      state.allDepartments = departments;
    },
    setEmploeers(state, { emploeers }) {
      console.log(emploeers);
      state.allEmplyeers = emploeers;
    },
    addEmploeerToDepartment(state, { departmentId, employeeId }) {
      const department = state.allDepartments.find(d => d.id === departmentId);
      department.emplyeers.push(employeeId);
    },
    addEmploeerToAllEmplyeers(state, employee) {
      state.allEmplyeers.push(employee);
    },
    setEmploeer(state, employee) {
      state.employer = employee;
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
    readAllDepatments({ commit }) {
      return departmentsAPI.readAll().then(data => {
        const departments = data.map(d => {
          // Referense query not work yet in firebase, so
          // we store only emploeer id
          d.emplyeers.forEach((ref, i) => {
            d.emplyeers[i] = ref.id;
          });
          return d;
        });

        commit('setDepartments', { departments });
      });
    },

    readAllEmploeers({ commit }) {
      return employersAPI.readAll().then(data => {
        commit('setEmploeers', { emploeers: data });
      });
    },

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
    readEmploeer({ commit }, employee) {
      employersAPI
        .read(employee)
        .then(newData => {
          commit('setEmploeer', newData );
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
    editEmploeer({ commit }, employee) {
      employersAPI
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
            ],
          });
        });
    },
  },
});
