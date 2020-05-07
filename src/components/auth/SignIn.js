import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Link } from 'react-router-dom';

export class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (e) => {
    this.setState({
      // set email or a password depending on the input id
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault(); // prevent the default action of a page reload on from submission
    this.props.signIn(this.state); // call the sign in action on form submission
  };

  render() {
    const { auth, authError, history } = this.props;

    // Route Guarding: If a user or company is logged in, this page should be inaccessible
    if (auth.uid) {
      history.push('/');
    }

    return (
      <div className="row m-0 full-height-width">
        <div className="col-lg-3 col-md-4 col-sm-6 center-align">
          <form onSubmit={this.handleSubmit} className="change-font-opensans ">
            <h3 class="mt-20 mb-4 text-center">Sign In</h3>

            <div>
              {/* Enter Email */}
              <input
                onChange={this.handleChange}
                type="email"
                id="email"
                class="form-control mb-4"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>

            <div class="form-label-group">
              {/* Enter Password */}
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
              {/* Remember Password checkbox*/}
              <input
                type="checkbox"
                class="custom-control-input"
                id="customCheck1"
              />
              <label class="custom-control-label" htmlFor="customCheck1">
                Remember password
              </label>
            </div>

            <div className="input-field">
              {/* Sign in button*/}
              <button
                class="btn btn-lg btn-secondary light-button form-rounded btn-block text-uppercase"
                type="submit"
              >
                Sign in
              </button>

              {/* To display sign in error */}
              {authError && (
                <div className="border border-danger rounded text-danger p-1">
                  <p>{authError}</p>
                </div>
              )}
            </div>
            <hr></hr>

            {/* Link to forget password page */}
            <div className="text-center">
              <Link to="/forgetpassword">Forgot Password?</Link>
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
