export const search = (destination) => {
  // we want to return a function and halt the action dispatch until the function finishes
  // dispatch is the funciton that dispatches an action to the reducer
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // this variable will have a reference to our database
    const firestore = getFirestore();

    // grabbing user's id and profile
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("Trips")
      .where([["destinations", "==", destination]])
      .then((trips) => {
        dispatch({ type: "SEARCH_TRIP", trips: trips });
      })
      .catch((err) => {
        dispatch({ type: "SEARCH_TRIP_ERROR", err });
      });
  };
};
