// for intial state when app starts
const initState = {};

const tripReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_TRIP":
      console.log("created trip", action.trip);
      return state;
    case "CREATE_TRIP_ERROR":
      console.log("created trip error", action.err);
      return state;
    default:
      return state;
  }
};

export default tripReducer;
