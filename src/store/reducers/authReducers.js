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
      console.log('sign in success');
      return {
        ...state,
        authError: null,
        profileLoading: false,
      };
    case 'SIGNIN_ERROR':
      console.log('sign in error');
      return {
        ...state,
        authError: action.err.message, // add autherror in addition to the currennt state to the auth property in the root reducer
        profileLoading: false,
      };
    case 'PROFILE_LOADING':
      console.log('profile is being loaded');
      return {
        ...state,
        authError: null,
        profileLoading: true,
      };
    case 'PROFILE_LOAD_SUCCESS':
      console.log('profile loaded successfully');
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
        authError: action.err.message, // add autherror in addition to the currennt state to the auth property in the root reducer
        currProfile: null,
        profileLoading: false,
      };
    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return {
        ...state,
        profile: null,
        currProfile: null,
        profileLoading: false,
      };
    case 'SIGNUP_SUCCESS':
      console.log('sign up success');
      return {
        ...state,
        authError: null,
        profileLoading: false,
      };
    case 'SIGNUP_ERROR':
      console.log('sign up user error');
      return {
        ...state,
        authError: action.err.message,
        profileLoading: false,
      };
    case 'RESET_SUCCESS':
      console.log('password reset success');
      return {
        ...state,
        authError: null,
        profileLoading: false,
      };
    case 'RESET_ERROR':
      console.log('password reset error');
      return {
        ...state,
        authError: action.err.message,
        profileLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
