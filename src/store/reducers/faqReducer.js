// for intial state when app starts
const initState = {};

const faqReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_QUESTION':
      return state;
    case 'ADD_QUESTION_ERROR':
      console.log('add question error', action.err);
      return state;
    case 'ADD_ANSWER':
      return state;
    case 'ADD_ANSWER_ERROR':
      console.log('add answer error', action.err);
      return state;
    case 'DELETE_FAQ':
      return state;
    case 'DELETE_FAQ_ERROR':
      console.log('delete faq error', action.err);
      return state;
    default:
      return state;
  }
};

export default faqReducer;
