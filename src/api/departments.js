import { db } from './../db';
import { mapCollectionDocs, extractProp } from './../utils';

const COLLECTION = db.collection('departments');

export const departmentsAPI = {
  readAll() {
    return COLLECTION.get().then(querySnapshot =>
      mapCollectionDocs(querySnapshot)
    );
  },

  create(data) {
    return COLLECTION.add(data);
  },

  read(id) {
    return COLLECTION.doc(id).then(doc => {
      if (doc.exists) return doc.data();
      console.log('No such document!');
      throw Error('No such document!');
    });
  },

  update(data) {
    const docId = extractProp(data, 'id');
    return COLLECTION.doc(docId).update(data);
  },

  delete(id) {
    return COLLECTION.doc(id).delete();
  },

  attachEmplyeer({ departmentId, employeeId }) {
    const docRef = COLLECTION.doc(departmentId);
    return db.runTransaction(transaction => {
      return transaction.get(docRef).then(dep => {
        if (!dep.exists) throw 'Document does not exist!';

        const newAttachedEmployeers = [...dep.data().emplyeers, employeeId];
        transaction.update(docRef, { emplyeers: newAttachedEmployeers });
        return newAttachedEmployeers;
      });
    });
  },
};
