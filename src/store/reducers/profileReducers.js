// for intial state when app starts
const initState = {};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case 'EDIT_PROFILE':
      console.log('edited profile', action.profile);
      return state;
    case 'EDIT_PROFILE_ERROR':
      console.log('edit trip error', action.err);
      return state;
    default:
      return state;
  }
};

export default profileReducer;
