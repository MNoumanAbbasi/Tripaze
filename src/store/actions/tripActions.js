import storage from '../../config/fbConfig';

export const createTrip = (trip, currProfile) => {
  // we want to return a function and halt the action dispatch until the function finishes
  // dispatch is the funciton that dispatches an action to the reducer
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // this variable will have a reference to our database
    const firestore = getFirestore();

    // grabbing user's id and profile
    const authorId = getState().firebase.auth.uid;

    // storing departures as lower case for search
    const destinationsLowerCase = trip.destinations.map((loc) =>
      loc.toLowerCase()
    );

    const destsSeparated = destinationsLowerCase
      .map((loc) => loc.split(' '))
      .flat()
      .concat(destinationsLowerCase);

    firestore
      .collection('Trips')
      .add({
        ...trip, // takes all the properties from createTrip
        companyId: authorId,
        companyName: currProfile.companyName,
        destinationsLowerCase: destsSeparated,
      })
      .then(() => {
        dispatch({ type: 'CREATE_TRIP', trip: trip });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_TRIP_ERROR', err });
      });
  };
};

export const editTrip = (trip, tripID) => {
  // we want to return a function and halt the action dispatch until the function finishes
  // dispatch is the funciton that dispatches an action to the reducer
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // this variable will have a reference to our database
    const firestore = getFirestore();
    delete trip.notUpdated; // TODO: Change this to a better method

    // storing departures as lower case for search
    const destinationsLowerCase = trip.destinations.map((loc) =>
      loc.toLowerCase()
    );

    const destsSeparated = destinationsLowerCase
      .map((loc) => loc.split(' '))
      .flat()
      .concat(destinationsLowerCase);

    firestore
      .collection('Trips')
      .doc(tripID)
      .update({
        ...trip, // takes all the properties from createTrip
        destinationsLowerCase: destsSeparated,
      })
      .then(() => {
        dispatch({ type: 'EDIT_TRIP', trip: trip });
      })
      .catch((err) => {
        dispatch({ type: 'EDIT_TRIP_ERROR', err });
      });
  };
};

export const deleteTrip = (img, tripID) => {
  // we want to return a function and halt the action dispatch until the function finishes
  // dispatch is the funciton that dispatches an action to the reducer
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //Deleting trip image from our storage
    const deleteRef = storage.ref(`${'tripImages/' + img}`);
    // Delete the file
    deleteRef
      .delete()
      .then(() => {
        // File deleted successfully
        console.log('Successfull deletion of image');
      })
      .catch((error) => {
        console.log(error);
      });
    // this variable will have a reference to our database
    const firestore = getFirestore();
    firestore
      .collection('Trips')
      .doc(tripID)
      .delete()
      .then(() => {
        dispatch({ type: 'DELETE_TRIP', tripID: tripID });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_TRIP_ERROR', err });
      });
  };
};

export const readNotification = (tripID) => {
  // we want to return a function and halt the action dispatch until the function finishes
  // dispatch is the funciton that dispatches an action to the reducer
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // this variable will have a reference to our database
    const firestore = getFirestore();
    firestore
      .collection('Trips')
      .doc(tripID)
      .update({
        notifications: false,
      })
      .then(() => {
        dispatch({ type: 'NOTIFICATION_READ', tripID: tripID });
      })
      .catch((err) => {
        dispatch({ type: 'NOTIFICATION_READ_ERROR', err });
      });
  };
};
