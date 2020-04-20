import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; // note: we do not need firebaseConnect here since we do not need to be in connect to firestore. We need to just connect to our redux state
import { Redirect } from 'react-router-dom';

const SignUpChoice = (props) => {
  const { auth } = props;

  // Route guard
  if (auth.uid) {
    return <Redirect to="/" />;
  }

  return (
    <div className="row m-0 signin-page ">
      <div className="col-lg-3 col-md-4 col-sm-6 form-margin">
        <h3 class="mt-20 mb-4 text-center ">Sign Up</h3>
        <div>
          <Link to="/signupuser">
            <button class="btn btn-lg light-button form-rounded btn-block text-uppercase mb-3 w-75 mx-auto">
              USER
            </button>
          </Link>
        </div>
        <div>
          <Link to="/signupcompany">
            <button class="btn btn-lg dark-button form-rounded btn-block text-uppercase b-3 w-75 mx-auto">
              COMPANY
            </button>
          </Link>
        </div>
      </div>
      <div className="col-lg-9 col-md-8 col-sm-6 d-sm-block d-none signup-background"></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

// Exporting to be used in app.js
export default connect(mapStateToProps)(SignUpChoice);
