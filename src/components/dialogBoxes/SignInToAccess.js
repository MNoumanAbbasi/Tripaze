import React from 'react';
import GeneralDialogBox from './GeneralDialogBox';
import { NavLink } from 'react-router-dom';

function SignInToAccess(props) {
  const cancelButton = (
    <button
      type="button"
      class="btn btn-lg r-green-button form-rounded object-hover"
      onClick={props.onHide}
    >
      Cancel
    </button>
  );
  const signInButton = (
    <NavLink to="/signin" class="nav-link">
      <button
        class="btn btn-secondary light-button mr-lg-3 my-2 my-lg-0 form-rounded"
        type="button"
      >
        SIGN IN
      </button>
    </NavLink>
  );

  const signUpButton = (
    <NavLink to="/signupchoice" class="nav-link">
      <button
        class="btn btn-secondary dark-button mr-lg-3 my-2 my-lg-0 form-rounded"
        type="button"
      >
        SIGN UP
      </button>
    </NavLink>
  );

  const buttons = [cancelButton, signInButton, signUpButton];
  return (
    <GeneralDialogBox
      show={props.show}
      onHide={props.onHide}
      buttons={buttons}
      title="Not Signed In"
      heading="Sign in to add a review"
      message="You can only add reviews if you are signed in. If you already have an account, click on sign in. To create an account, click on sign up"
    />
  );
}

export default SignInToAccess;
