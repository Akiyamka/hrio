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
    getDepartmentEmploeers: state => department =>
      state.allEmplyeers.filter(empl => department.emplyeers.includes(empl.id)),
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
