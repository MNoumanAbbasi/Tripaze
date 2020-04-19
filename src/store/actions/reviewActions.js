export const addReview = (review, companyID) => {
  // we want to return a function and halt the action dispatch until the function finishes
  // dispatch is the funciton that dispatches an action to the reducer
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // this variable will have a reference to our database
    const firestore = getFirestore();

    // grabbing user's id and profile
    const userID = getState().firebase.auth.uid;
    const userName = getState().auth.currProfile.userName;
    firestore
      .collection('Reviews')
      .add({
        ...review, // takes the review and the rating
        companyID: companyID,
        userName: userName,
        userID: userID,
      })
      .then(() => {
        window.location.reload(); // TODO: This is a hacky change. For global change, page needs to be refreshed. Find a solution to automatically update it when props change
        dispatch({ type: 'ADD_REVIEW', review: review });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_REVIEW_ERROR', err });
      });
  };
};

export const deleteReview = (reviewID) => {
  // we want to return a function and halt the action dispatch until the function finishes
  // dispatch is the funciton that dispatches an action to the reducer
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // this variable will have a reference to our database
    const firestore = getFirestore();
    firestore
      .collection('Reviews')
      .doc(reviewID)
      .delete()
      .then(() => {
        dispatch({ type: 'DELETE_REVIEW', reviewID: reviewID });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_REVIEW_ERROR', err });
      });
  };
};
