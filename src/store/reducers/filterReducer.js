// for intial state when app starts
const initState = { trips: null, showSearch: true };

const filterReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SEARCH_TRIP':
      console.log('created trip', action.trip);
      return {
        ...state,
        trips: action.trips,
      };
    case 'SEARCH_TRIP_ERROR':
      console.log('created trip error', action.err);
      return state;
    case 'SHOW_SEARCH_BAR':
      console.log('search bar now showing');
      return {
        ...state,
        showSearch: true,
      };
    case 'HIDE_SEARCH_BAR':
      console.log('search bar now hiding');
      return {
        ...state,
        showSearch: false,
      };
    default:
      return state;
  }
};

export default filterReducer;
