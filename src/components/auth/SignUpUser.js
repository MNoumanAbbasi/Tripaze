import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUpUser } from '../../store/actions/authActions';
import { Link } from 'react-router-dom';

// all css are from the materialized CSS class
export class SignUpUser extends Component {
  state = {
    email: '',
    password: '',
    userName: '',
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
    this.props.signUp(this.state);
  };

  render() {
    const { auth, authError } = this.props;

    if (auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div className="row m-0 full-height-width">
        <div className="col-lg-3 col-md-4 col-sm-6 form-margin">
          <form onSubmit={this.handleSubmit} className="change-font-opensans ">
            <h3 class="mt-20 mb-4 text-center">Sign Up as User</h3>

            <div>
              <input
                onChange={this.handleChange}
                type="text"
                id="username"
                class="form-control mb-4"
                placeholder="Full Name"
                required
              />
            </div>

            <div>
              <input
                onChange={this.handleChange}
                type="email"
                id="email"
                class="form-control mb-4"
                placeholder="Email address"
                required
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

            <div>
              <button
                class="btn btn-lg light-button form-rounded btn-block text-uppercase"
                type="submit"
              >
                Sign Up
              </button>
              {/* To display sign up error */}
              <div className="red-text center">
                {authError ? <p>{authError}</p> : null}
              </div>
            </div>
            <hr></hr>
            <div className="text-center">
              <h5 class="m-0 ">Are you a Company?</h5>
              <Link to="/signupcompany">Sign Up here</Link>
            </div>
          </form>
        </div>
        <div className="col-lg-9 col-md-8 col-sm-6 d-sm-block d-none signup-background"></div>
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpUser);
