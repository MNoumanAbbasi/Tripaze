export const addQuestion = (question, tripID, userType) => {
  // we want to return a function and halt the action dispatch until the function finishes
  // dispatch is the funciton that dispatches an action to the reducer
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // this variable will have a reference to our database
    const firestore = getFirestore();

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
        // add notification
        if (userType === 'User') {
          firestore.collection('Trips').doc(tripID).update({
            notifications: true,
          });
        }
      })
      .then(() => {
        dispatch({ type: 'ADD_QUESTION', question });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_QUESTION_ERROR', err });
      });
  };
};

export const addAnswer = (answer, faqID) => {
  // we want to return a function and halt the action dispatch until the function finishes
  // dispatch is the funciton that dispatches an action to the reducer
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // this variable will have a reference to our database
    const firestore = getFirestore();

    firestore
      .collection('FAQs')
      .doc(faqID)
      .update({
        answer,
        // userName, // userName is name of person asking (user or company)
        // userID, // userID is either companyID or signed in userID
        // tripID,
      })
      .then(() => {
        dispatch({ type: 'ADD_ANSWER', answer });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_ANSWER_ERROR', err });
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
