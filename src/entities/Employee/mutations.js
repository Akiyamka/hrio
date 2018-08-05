export function setEmploeer(state, employee) {
  state.employer = employee;
}

export function setEmploeers(state, { emploeers }) {
  state.allEmplyeers = emploeers;
}

export function updateEmploeer(state, { id, newData }) {
  const emplyeerForUpdate = state.allEmplyeers.find(e => e.id === id);
  Object.assign(emplyeerForUpdate, newData);
}

export function addEmploeerToAllEmplyeers(state, employee) {
  state.allEmplyeers.push(employee);
}
