export const addQuestion = (question, tripID) => {
  // we want to return a function and halt the action dispatch until the function finishes
  // dispatch is the funciton that dispatches an action to the reducer
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // this variable will have a reference to our database
    const firestore = getFirestore();

    // grabbing user's id and profile // TODO: why not working here
    const userID = getState().firebase.auth.uid;
    const userName = getState().auth.currProfile.userName;

    firestore
      .collection('FAQs')
      .add({
        question,
        answer: '',
        // userName, // userName is name of person asking (user or company)
        // userID, // userID is either companyID or signed in userID
        tripID,
      })
      .then(() => {
        dispatch({ type: 'ADD_QUESTION', question });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_QUESTION_ERROR', err });
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
        dispatch({ type: 'DELETE_FAQ', faqID });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_FAQ_ERROR', err });
      });
  };
};
