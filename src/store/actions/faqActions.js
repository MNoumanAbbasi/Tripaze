export const addFaq = (faq, tripID) => {
  // we want to return a function and halt the action dispatch until the function finishes
  // dispatch is the funciton that dispatches an action to the reducer
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // this variable will have a reference to our database
    const firestore = getFirestore();

    // grabbing user's id and profile
    const userID = getState().firebase.auth.uid;
    const userName = getState().auth.currProfile.userName;
    firestore
      .collection('FAQs')
      .add({
        ...faq, // takes both question and answer
        userName, // userName is name of person asking (user or company)
        userID, // userID is either companyID or signed in userID
        tripID,
      })
      .then(() => {
        window.location.reload(); // TODO: This is a hacky change. For global change, page needs to be refreshed. Find a solution to automatically update it when props change
        dispatch({ type: 'ADD_FAQ', review: review });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_FAQ_ERROR', err });
      });
  };
};

export const deleteFaq = (faqID) => {
  // we want to return a function and halt the action dispatch until the function finishes
  // dispatch is the funciton that dispatches an action to the reducer
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // this variable will have a reference to our database
    const firestore = getFirestore();
    firestore
      .collection('FAQs')
      .doc(faqID)
      .delete()
      .then(() => {
        window.location.reload(); // TODO: This is a hacky change. For global change, page needs to be refreshed. Find a solution to automatically update it when props change
        dispatch({ type: 'DELETE_FAQ', reviewID: reviewID });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_FAQ_ERROR', err });
      });
  };
};
