// for intial state when app starts
const initState = {
    authError: null
}



// note return would modify the auth property in the root reducer
const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'SIGNIN_SUCCESS':
            console.log("sign in success")
            return {
                ...state,
                authError: null,
                currProfile: action.currProfile
            }
        case 'SIGNIN_ERROR':
            console.log("sign in error")
            return {
                ...state,
                authError: action.err.message // add autherror in addition to the currennt state to the auth property in the root reducer
            }
        case 'SIGNOUT_SUCCESS':
            console.log("signout success")
            return {
                ...state,
                currProfile: null,
            }
        case 'SIGNUP_SUCCESS':
            console.log("sign up success")
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log("sign up user error")
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state
    }
}

export default authReducer