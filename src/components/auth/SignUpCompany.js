import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUpCompany } from '../../store/actions/authActions';
import { Link } from 'react-router-dom';

// TODO: CHANGE THIS TO MAKE IT A USER
// all css are from the materialized CSS class
export class SignUpCompany extends Component {
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
      <div className="row m-0 signin-page ">
        <div className="ccol-lg-3 col-md-4 col-sm-6 form-margin">
          <form onSubmit={this.handleSubmit} className="change-font-opensans ">
            <h3 class="mt-20 mb-4 text-center">Sign Up as Company</h3>
            <div>
              <input
                onChange={this.handleChange}
                type="text"
                id="companyName"
                class="form-control mb-4"
                placeholder="Company Name"
                required
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                type="text" //might need to change this
                id="contact"
                class="form-control mb-4"
                placeholder="Contact Number"
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
            <div class="custom-control custom-checkbox mb-3">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customCheck1"
                required
              />
              <label class="custom-control-label" for="customCheck1">
                You confirm that you are a registered company. (We may contact
                you to confirm this.)
              </label>
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
              <h5 class="m-0 ">Are you a User?</h5>
              <Link to="/signupuser">Sign Up here</Link>
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
    signUp: (newUser) => dispatch(signUpCompany(newUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpCompany);
