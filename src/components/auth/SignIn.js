import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

// all css are from the materialized CSS class
export class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (e) => {
    this.setState({
      // is an email being entered or a password?
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    // dont want the default action of page being reloaded
    e.preventDefault();
    this.props.signIn(this.state);
  };

  render() {
    const { auth, authError } = this.props;

    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div className="row m-0 full-height-width">
        <div className="col-lg-3 col-md-4 col-sm-6 center-align">
          <form onSubmit={this.handleSubmit} className="change-font-opensans ">
            <h3 class="mt-20 mb-4 text-center">Sign In</h3>

            <div>
              <input
                onChange={this.handleChange}
                type="email"
                id="email"
                class="form-control mb-4"
                placeholder="Email address"
                required
                autofocus
              />
            </div>

            <div class="form-label-group">
              <input
                onChange={this.handleChange}
                type="password"
                id="password"
                class="form-control mb-4"
                placeholder="Password"
                required
              />
            </div>

            <div class="custom-control custom-checkbox mb-3">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customCheck1"
              />
              <label class="custom-control-label" for="customCheck1">
                Remember password
              </label>
            </div>
            <div className="input-field">
              <button
                class="btn btn-lg btn-secondary light-button form-rounded btn-block text-uppercase"
                type="submit"
              >
                Sign in
              </button>
              <div className="red-text center">
                {authError ? <p>{authError}</p> : null}
              </div>
            </div>
            <hr></hr>
            <div className="text-center">
              <a href="">Forgot Password?</a>
            </div>
          </form>
        </div>
        <div className="col-lg-9 col-md-8 col-sm-6 d-sm-block d-none signin-background"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError, // in root reducer check auth property and the authError in that property
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)), // pass this to the actions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
