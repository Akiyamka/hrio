import { db } from './../../db';
import { mapCollectionDocs, extractProp } from './../../utils';
import { departmentsAPI } from './../Department/api';

const COLLECTION = db.collection('emplyeers');

function readAll() {
  return COLLECTION.get().then(querySnapshot =>
    mapCollectionDocs(querySnapshot)
  );
}

function create(employee, departmentId) {
  delete employee.id;
  return COLLECTION.add(employee)
    .then(docRef => {
      const employeeId = docRef.id;
      return departmentsAPI
        .attachEmplyeer({
          departmentId,
          employeeRef: docRef,
        })
        .then(() => {
          return employeeId;
        });
    })
    .catch(error => {
      console.error('Error adding document: ', error);
      throw new Error();
    });
}

function read(id) {
  const docRef = COLLECTION.doc(id);
  return docRef.get().then(doc => {
    if (doc.exists)
      return {
        ...doc.data(),
        id: doc.id,
      };
    throw Error('No such document!');
  });
}

function update(data) {
  const newData = { ...data };
  const docId = extractProp(newData, 'id');
  return COLLECTION.doc(docId).update(data);
}

function remove(id) {
  return COLLECTION.doc(id).delete();
}

export const employersAPI = {
  readAll,
  create,
  read,
  update,
  remove,
};
