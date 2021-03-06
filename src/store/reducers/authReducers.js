// for intial state when app starts
const initState = {
  authError: null,
  currProfile: null,
  profileLoading: false,
};

// note return would modify the auth property in the root reducer
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        authError: null,
        profileLoading: false,
      };
    case 'SIGNIN_ERROR':
      console.log('sign in error');
      return {
        ...state,
        authError: action.err, // add autherror in addition to the currennt state to the auth property in the root reducer
        profileLoading: false,
      };
    case 'CLEAR_AUTH_ERROR':
      console.log('clearing auth errors');
      return {
        ...state,
        authError: null,
      };
    case 'PROFILE_LOADING':
      return {
        ...state,
        authError: null,
        profileLoading: true,
      };
    case 'PROFILE_LOAD_SUCCESS':
      return {
        ...state,
        authError: null,
        profileLoading: false,
        currProfile: action.currProfile,
      };
    case 'PROFILE_LOAD_ERROR':
      console.log('profile load error');
      return {
        ...state,
        authError: action.err, // add autherror in addition to the currennt state to the auth property in the root reducer
        currProfile: null,
        profileLoading: false,
      };
    case 'SIGNOUT_SUCCESS':
      return {
        ...state,
        profile: null,
        currProfile: null,
        profileLoading: false,
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        authError: null,
        profileLoading: false,
      };
    case 'SIGNUP_COMPANY_ERROR':
      console.log('sign up user error');
      return {
        ...state,
        authError: action.err,
        profileLoading: false,
      };
    case 'SIGNUP_ERROR':
      console.log('sign up user error');
      return {
        ...state,
        authError: action.err,
        profileLoading: false,
      };
    case 'RESET_SUCCESS':
      return {
        ...state,
        authError: 'none', // use this for changing state at forget pass page
        profileLoading: false,
      };
    case 'RESET_ERROR':
      console.log('password reset error');
      return {
        ...state,
        authError: action.err,
        profileLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
