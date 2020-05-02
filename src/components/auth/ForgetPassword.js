import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { resetPassword } from '../../store/actions/authActions';

const ForgetPassword = (props) => {
  const [email, setEmail] = useState('');
  // const [error, setError] = useState('');
  const { auth, authEror, resetPassword } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sending password reset email
    resetPassword(email);
  };

  if (auth.uid) {
    return <Redirect to="/" />;
  }

  return (
    <div className="row m-0 full-height-width">
      <div className="col-lg-3 col-md-4 col-sm-6 center-align">
        <form onSubmit={handleSubmit} className="change-font-opensans ">
          <h3 class="mt-20 mb-4 text-center">Forget Password</h3>

          <div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              class="form-control mb-4"
              placeholder="Email address"
              required
              autoFocus
            />
          </div>

          <div className="input-field">
            <button
              class="btn btn-lg btn-secondary light-button form-rounded btn-block text-uppercase"
              type="submit"
            >
              Reset
            </button>
            <div className="red-text center">
              {authEror ? <p>{authEror}</p> : null}
            </div>
          </div>
          <hr></hr>
          <div className="text-center">
            <Link to="/signin">Return to Sign in</Link>
          </div>
        </form>
      </div>
      <div className="col-lg-9 col-md-8 col-sm-6 d-sm-block d-none signin-background"></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (email) => dispatch(resetPassword(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
