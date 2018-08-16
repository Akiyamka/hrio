import Vue from 'vue';
import Vuex from 'vuex';
import { messageTypes } from './constants';

import * as employeeActions from './entities/Employee/actions';
import * as employeeMutations from './entities/Employee/mutations';
import employerStore from './entities/Employee/store';

import * as departmentActions from './entities/Department/actions';
import * as departmentMutations from './entities/Department/mutations';
import departmentStore from './entities/Employee/store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...employerStore,
    ...departmentStore,
  },
  getters: {
    getDepartmentEmploeers: state => department => {
      const departmentEmployersIds = department.emplyeers.map(empl => empl.id);
      return departmentEmployersIds.reduce((acc, emplId) => {
        if (state.allEmplyeers[emplId] === undefined) {
          console.error(`Employer ${emplId} attached to department not exist.`);
          return acc;
        }
        acc[emplId] = state.allEmplyeers[emplId];
        return acc;
      }, {});
    },
  },
  mutations: {
    ...employeeMutations,
    ...departmentMutations,
    showMessage(state, { type = messageTypes.WARNING, message }) {
      const showMsg = Array.isArray(message) ? message.join(', ') : message;
      console.log(type, showMsg);
    },
  },
  actions: {
    ...departmentActions,
    ...employeeActions,
  },
});
