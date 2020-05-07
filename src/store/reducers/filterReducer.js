// for intial state when app starts
const initState = { trips: null, showSearch: true };

const filterReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SEARCH_TRIP':
      return {
        ...state,
        trips: action.trips,
      };
    case 'SEARCH_TRIP_ERROR':
      return state;
    case 'SHOW_SEARCH_BAR':
      return {
        ...state,
        showSearch: true,
      };
    case 'HIDE_SEARCH_BAR':
      return {
        ...state,
        showSearch: false,
      };
    default:
      return state;
  }
};

export default filterReducer;
