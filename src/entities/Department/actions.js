import { newEmployerPrefix } from './../../constants';
import { departmentsAPI } from './api';

export function readAllDepatments({ commit }) {
  return departmentsAPI.readAll().then(departments => {
    commit('setDepartments', { departments });
  });
}

export function addEmploeerToDepartment({ commit }, selectedDepartment) {
  const Employee = name => ({
    name,
    surname: null,
    position: null,
    id: newEmployerPrefix + selectedDepartment.id,
  });

  const employee = Employee('Новый работник');

  commit('addEmploeerToAllEmplyeers', employee);
  commit('addEmploeerToDepartment', {
    employeeId: employee.id,
    departmentId: selectedDepartment.id,
  });

  return employee;
}
