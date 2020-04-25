export const createTrip = (trip, currProfile) => {
  // we want to return a function and halt the action dispatch until the function finishes
  // dispatch is the funciton that dispatches an action to the reducer
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // this variable will have a reference to our database
    const firestore = getFirestore();

    // grabbing user's id and profile
    const authorId = getState().firebase.auth.uid;

    // Storing date as long names
    const date = new Date(trip.departureDate).toDateString(); // Wed Apr 08 2020
    const dateSplit = date.split(' ');
    const newDate = dateSplit[1] + ' ' + dateSplit[2] + ', ' + dateSplit[3];
    trip.departureDate = newDate;

    // storing departures as lower case for search
    const destinationsLowerCase = trip.destinations.map((loc) =>
      loc.toLowerCase()
    );

    firestore
      .collection('Trips')
      .add({
        ...trip, // takes all the properties from createTrip
        companyId: authorId,
        companyName: currProfile.companyName,
        destinationsLowerCase: destinationsLowerCase,
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

    // Storing date as long names
    const date = new Date(trip.departureDate).toDateString(); // Wed Apr 08 2020
    const dateSplit = date.split(' ');
    const newDate = dateSplit[1] + ' ' + dateSplit[2] + ', ' + dateSplit[3];
    trip.departureDate = newDate;

    firestore
      .collection('Trips')
      .doc(tripID)
      .update({
        ...trip, // takes all the properties from createTrip
      })
      .then(() => {
        dispatch({ type: 'EDIT_TRIP', trip: trip });
      })
      .catch((err) => {
        dispatch({ type: 'EDIT_TRIP_ERROR', err });
      });
  };
};

export const deleteTrip = (tripID) => {
  // we want to return a function and halt the action dispatch until the function finishes
  // dispatch is the funciton that dispatches an action to the reducer
  return (dispatch, getState, { getFirebase, getFirestore }) => {
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
