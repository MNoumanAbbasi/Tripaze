// for intial state when app starts
const initState = { trips: null };

const filterReducer = (state = initState, action) => {
  switch (action.type) {
    case "SEARCH_TRIP":
      console.log("created trip", action.trip);
      return {
        ...state,
        trips: action.trips,
      };
    case "SEARCH_TRIP_ERROR":
      console.log("created trip error", action.err);
      return state;
    default:
      return state;
  }
};

export default filterReducer;
