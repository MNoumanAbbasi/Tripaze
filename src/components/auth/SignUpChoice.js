import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"; // note: we do not need firebaseConnect here since we do not need to be in connect to firestore. We need to just connect to our redux state
import { Redirect } from "react-router-dom";

const SignUpChoice = (props) => {
  const { auth } = props;

  // Route guard
  if (auth.uid) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <h5 className="gre-text text-darken-3">Sign Up</h5>
      <div className="input-field">
        <Link to="/signupuser">
          <button className="btn blue lighten-1 z-depth-1">User</button>
        </Link>
      </div>
      <div className="input-field">
        <Link to="/signupcompany">
          <button className="btn blue lighten-1 z-depth-1">Company</button>
        </Link>
      </div>
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
