import firebase from 'firebase';

export const signIn = (credentials) => {
  // getFirebase is to communicate with our firebase project to sign a use
  return (dispatch, getState) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: 'SIGNIN_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'SIGNIN_ERROR', err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' });
      });
  };
};

// newUser contains all the information obtained from the sign up form
export const signUpUser = (newUser) => {
  return (dispatch, getState, { getFirestore }) => {
    var uid;
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp) => {
        // Note: we are not using add over here like we did for creating trips because we want to assign the id given by firebase auth (i.e. resp.user.uid)
        uid = resp.user.uid;
        return firestore.collection('UserTypes').doc(uid).set({
          userType: 'User',
        });
      })
      .then((resp) => {
        // Note: we are not using add over here like we did for creating trips because we want to assign the id given by firebase auth (i.e. resp.user.uid)
        return firestore.collection('Users').doc(uid).set({
          userName: newUser.userName,
        });
      })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
  };
};
