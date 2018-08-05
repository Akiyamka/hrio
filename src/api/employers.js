import { db } from './../db';
import { mapCollectionDocs, extractProp } from './../utils';
import { departmentsAPI } from './departments';

const COLLECTION = db.collection('emplyeers');

export const employersAPI = {
  readAll() {
    return COLLECTION.get().then(querySnapshot =>
      mapCollectionDocs(querySnapshot)
    );
  },

  create(employee, departmentId) {
    return COLLECTION.add(employee)
      .then(docRef => {
        const employeeId = docRef.id;
        return departmentsAPI
          .attachEmplyeer({
            departmentId,
            employeeId,
          })
          .then(() => {
            return employeeId;
          });
      })
      .catch(error => {
        console.error('Error adding document: ', error);
        throw new Error();
      });
  },

  read(id) {
    const docRef = COLLECTION.doc(id);
    return docRef.get().then(doc => {
      if (doc.exists) return doc.data();
      console.log('No such document!');
      throw Error('No such document!');
    });
  },

  update(data) {
    console.log(data);
    const docId = extractProp(data, 'id');
    return COLLECTION.doc(docId).update(data);
  },

  delete(id) {
    COLLECTION.doc(id).delete();
  },
};
