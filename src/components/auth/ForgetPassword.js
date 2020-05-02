import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { signUpUser } from '../../store/actions/authActions';

const ForgetPassword = (props) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    // dont want the default action of page being reloaded
    e.preventDefault();
    // this.props.signUp(this.state);
  };
  const { auth, authError } = props;

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
              autofocus
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
              {authError ? <p>{authError}</p> : null}
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
    signUp: (newUser) => dispatch(signUpUser(newUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
