export function setDepartments(state, { departments }) {
  state.allDepartments = departments;
}

export function addEmploeerToDepartment(state, { departmentId, employeeId }) {
  const department = state.allDepartments.find(d => d.id === departmentId);
  department.emplyeers.push(employeeId);
}