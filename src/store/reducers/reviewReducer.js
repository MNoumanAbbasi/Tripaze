// for intial state when app starts
const initState = {};

const reviewReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_REVIEW':
      return state;
    case 'ADD_REVIEW_ERROR':
      console.log('add review error', action.err);
      return state;
    case 'DELETE_REVIEW':
      return state;
    case 'DELETE_REVIEW_ERROR':
      console.log('delete review error', action.err);
      return state;
    default:
      return state;
  }
};

export default reviewReducer;
