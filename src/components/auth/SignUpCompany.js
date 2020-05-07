import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { signUpCompany } from '../../store/actions/authActions';
import { Link } from 'react-router-dom';
import { succesfulSignUp } from '../modals/AuthModals';

export class SignUpCompany extends Component {
  state = {
    email: '',
    password: '',
    userName: '',
  };

  handleChange = (e) => {
    this.setState({
      // set state depending on the input id
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault(); // prevent the default action of a page reload on from submission
    this.props.signUp(this.state); // call the sign in action on form submission
  };

  render() {
    const { auth, authError } = this.props;

    if (auth.uid) {
      succesfulSignUp(); // display a sign up successful page after sign up complete (so auth uid is not null)
      this.props.history.push('/'); // Route Guarding: If a user or company is logged in, this page should be inaccessible
    }

    return (
      <div className="row m-0 full-height-width">
        <div className="col-lg-3 col-md-4 col-sm-6 center-align">
          <form onSubmit={this.handleSubmit} className="change-font-opensans ">
            <h3 class="mt-20 mb-4 text-center">Sign Up as Company</h3>

            {/* Enter company name */}
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

            {/* Enter company number */}
            <div>
              <input
                onChange={this.handleChange}
                type="number"
                id="contact"
                class="form-control mb-4"
                placeholder="Contact Number"
                required
              />
            </div>

            {/* Enter company email */}
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

            {/* Enter password */}
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

            {/* Check box to accept that the company is a registered one */}
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

            {/* Sign up button */}
            <div>
              <button
                class="btn btn-lg btn-secondary light-button form-rounded btn-block text-uppercase"
                type="submit"
              >
                Sign Up
              </button>

              {/* To display sign up error */}
              {authError && (
                <div className="border border-danger rounded text-danger p-1">
                  <p>{authError}</p>
                </div>
              )}
            </div>
            <hr></hr>

            {/* Link to sign up as user */}
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter // to access route-router props for url redirections
)(SignUpCompany);
