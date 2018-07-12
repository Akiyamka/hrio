import Vue from 'vue';
import Vuex from 'vuex';
import { db } from './db';
import { firebaseMutations, firebaseAction } from 'vuexfire';
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
    createEmploeer(state, employee) {
      state.allEmplyeers.push(employee);
    },
  },
  actions: {
    addEmploeerToDepartment({ commit, state }, selectedDepartment) {
      function Employee(name) {
        return {
          name,
          surname: null,
          position: null,
        };
      }
      const employee = Employee('test');

      db.collection('emplyeers')
        .add(employee)
        .then(docRef => {
          employee.id = docRef.id;
          commit('createEmploeer', employee);
          commit('addEmploeerToDepartment', {
            employeeId: docRef.id,
            departmentId: selectedDepartment.id,
          });
          console.log('Document written with ID: ', docRef);
        })
        .catch(function(error) {
          console.error('Error adding document: ', error);
        });

      // const newEmployeeId = db
      //   .ref()
      //   .child('emplyeers')
      //   .push().key;

      // const updates = {};
      // updates['/emplyeers/' + newEmployeeId] = employee;
      // db.ref().update(updates);
    },
  },
});
