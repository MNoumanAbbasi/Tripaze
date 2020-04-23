// for intial state when app starts
const initState = {};

const faqReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_QUESTION':
      console.log('added question', action.question);
      return state;
    case 'ADD_QUESTION_ERROR':
      console.log('add question error', action.err);
      return state;
    case 'DELETE_FAQ':
      console.log('deleted faq', action.faqID);
      return state;
    case 'DELETE_FAQ_ERROR':
      console.log('delete faq error', action.err);
      return state;
    default:
      return state;
  }
};

export default faqReducer;
