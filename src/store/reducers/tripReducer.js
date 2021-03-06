// for intial state when app starts
const initState = {};

const tripReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_TRIP':
      return state;
    case 'CREATE_TRIP_ERROR':
      console.log('created trip error', action.err);
      return state;
    case 'EDIT_TRIP':
      return state;
    case 'EDIT_TRIP_ERROR':
      console.log('edited trip error', action.err);
      return state;
    case 'DELETE_TRIP':
      return state;
    case 'DELETE_TRIP_ERROR':
      console.log('deleted trip error', action.err);
      return state;
    case 'NOTIFICATION_READ':
      return state;
    case 'NOTIFICATION_READ_ERROR':
      console.log('unable to read notification', action.err);
      return state;
    default:
      return state;
  }
};

export default tripReducer;
