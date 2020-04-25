import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import {
  createFirestoreInstance,
  getFirestore,
  reduxFirestore,
} from 'redux-firestore';
import {
  ReactReduxFirebaseProvider,
  getFirebase,
  isLoaded,
} from 'react-redux-firebase';
import fbConfig from './config/fbConfig';
import firebase from 'firebase/app';
import LoadingBox from './components/dashboard/LoadingBox';

// Multiple reducers for multiple actions
// Thunk with extra arguments takes in an object
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    // to let these bindings know the specific config
    reduxFirestore(firebase, fbConfig) // redux bindings for firestore
  )
);

//construct required properties
const profileSpecificProps = {
  userProfile: 'UserTypes',
  useFirestoreForProfile: true,
  enableRedirectHandling: false,
  resetBeforeLogin: false,
};

// redux binding for firebase. This is the updated method to bind firebase
const rrfProps = {
  firebase,
  config: fbConfig,
  //second config added here
  config: profileSpecificProps,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

// This is to ensure that the website does not show wrong links when the firebase authentication has not been loaded
function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <LoadingBox />;
  else return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// serviceWorker.unregister();
