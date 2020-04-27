export const editProfile = (profile, companyID) => {
  // we want to return a function and halt the action dispatch until the function finishes
  // dispatch is the funciton that dispatches an action to the reducer
  return (dispatch, getState, { getFirestore }) => {
    // this variable will have a reference to our database
    const firestore = getFirestore();
    firestore
      .collection('Companies')
      .doc(companyID)
      .update({
        ...profile, // takes all the properties from createTrip
      })
      .then(() => {
        dispatch({ type: 'EDIT_PROFILE', profile });
      })
      .catch((err) => {
        dispatch({ type: 'EDIT_PROFILE_ERROR', err });
      });
  };
};
