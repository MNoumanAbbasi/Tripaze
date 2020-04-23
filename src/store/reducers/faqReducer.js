// for intial state when app starts
const initState = {};

const faqReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_FAQ':
      console.log('added faq', action.review);
      return state;
    case 'ADD_FAQ_ERROR':
      console.log('add faq error', action.err);
      return state;
    case 'DELETE_FAQ':
      console.log('deleted faq', action.reviewID);
      return state;
    case 'DELETE_FAQ_ERROR':
      console.log('delete faq error', action.err);
      return state;
    default:
      return state;
  }
};

export default faqReducer;
