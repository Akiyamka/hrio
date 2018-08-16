import { db } from './../../db';
import { mapCollectionDocs, extractProp } from './../../utils';

const COLLECTION = db.collection('departments');

function readAll() {
  return COLLECTION.get().then(querySnapshot =>
    mapCollectionDocs(querySnapshot)
  );
}

function create(data) {
  return COLLECTION.add(data);
}

function read(id) {
  return COLLECTION.doc(id).then(doc => {
    if (doc.exists) return doc.data();
    console.log('No such document!');
    throw Error('No such document!');
  });
}

function update(data) {
  const docId = extractProp(data, 'id');
  return COLLECTION.doc(docId).update(data);
}

function remove(id) {
  return COLLECTION.doc(id).delete();
}

function attachEmplyeer({ departmentId, employeeRef }) {
  const docRef = COLLECTION.doc(departmentId);

  return db.runTransaction(transaction => {
    return transaction.get(docRef).then(dep => {
      if (!dep.exists) throw 'Document does not exist!';

      const newAttachedEmployeers = [...dep.data().emplyeers, employeeRef];
      transaction.update(docRef, { emplyeers: newAttachedEmployeers });
      return newAttachedEmployeers;
    });
  });
}

function detachEmplyeer({ departmentId, employeeId }) {
  const departmentRef = COLLECTION.doc(departmentId);

  return db.runTransaction(transaction => {
    return transaction.get(departmentRef).then(dep => {
      if (!dep.exists) throw 'Document does not exist!';

      const newAttachedEmployeers = dep
        .data()
        .emplyeers.filter(oldEmpl => oldEmpl.id !== employeeId);

      transaction.update(departmentRef, { emplyeers: newAttachedEmployeers });
      return newAttachedEmployeers;
    });
  });
}

export const departmentsAPI = {
  readAll,
  create,
  read,
  update,
  remove,
  attachEmplyeer,
  detachEmplyeer,
};
