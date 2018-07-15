import { db } from './../db';

const COLLETION = 'emplyeers';

export default function create(employee) {
  db.collection(COLLETION)
    .add(employee)
    .then(docRef => docRef.id)
    .catch(error => {
      console.error('Error adding document: ', error);
      throw new Error();
    });
}
