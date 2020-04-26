export const editProfile = (profile, companyID) => {
  // we want to return a function and halt the action dispatch until the function finishes
  // dispatch is the funciton that dispatches an action to the reducer
  // return (dispatch, getState, { getFirebase, getFirestore }) => {
  //   // this variable will have a reference to our database
  //   const firestore = getFirestore();
  //   delete trip.notUpdated; // TODO: Change this to a better method
  //   // Storing date as long names
  //   const date = new Date(trip.departureDate).toDateString(); // Wed Apr 08 2020
  //   const dateSplit = date.split(' ');
  //   const newDate = dateSplit[1] + ' ' + dateSplit[2] + ', ' + dateSplit[3];
  //   trip.departureDate = newDate;
  //   firestore
  //     .collection('Trips')
  //     .doc(tripID)
  //     .update({
  //       ...trip, // takes all the properties from createTrip
  //     })
  //     .then(() => {
  //       dispatch({ type: 'EDIT_TRIP', trip: trip });
  //     })
  //     .catch((err) => {
  //       dispatch({ type: 'EDIT_TRIP_ERROR', err });
  //     });
  // };
};
