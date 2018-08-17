import firebase from '@firebase/app';
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "firebaseui" }]*/
import * as firebaseui from 'firebaseui';

function fireBaseAuth() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithRedirect(provider)
    .then(result => {
      const token = result.credential.accessToken;
      const user = result.user;
      return { token, user };
    })
    .catch(error => {
      console.debug(
        '[DB] Auth Failed:',
        error.code,
        error.message,
        error.email,
        error.credential // The firebase.auth.AuthCredential type that was used.
      );
      throw error;
    });
}

function signIn() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        return resolve({
          email: user.email,
          emailVerified: user.emailVerified,
          id: user.uid,
          displayName: user.displayName,
        });
      } else {
        fireBaseAuth()
          .then(({ user }) => {
            resolve(user);
          })
          .catch(error => reject(error));
      }
    });
  });
}

function signOut() {
  return firebase.auth().signOut();
}

export const authAPI = {
  signIn,
  signOut,
};
