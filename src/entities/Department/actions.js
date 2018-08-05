import { generateUID } from './../../utils';
import { departmentsAPI } from './api';

export function readAllDepatments({ commit }) {
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
}

export function addEmploeerToDepartment({ commit }, selectedDepartment) {
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
}
