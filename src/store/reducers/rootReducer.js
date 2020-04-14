import authReducer from './authReducers'
import tripReducer from './tripReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore' // predifined reducer to link up our firestore with the app in the background
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    trip: tripReducer,
    firestore: firestoreReducer, // automatically syncs (retrieve). Keeps updated state in property firestore
    firebase: firebaseReducer, // Will sync the sign in status
})

export default rootReducer