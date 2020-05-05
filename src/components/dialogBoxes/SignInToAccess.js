import React from 'react';
import GeneralDialogBox from './GeneralDialogBox';
import { NavLink } from 'react-router-dom';

function SignInToAccess(props) {
  const signInButton = (
    <NavLink key="SignIn" to="/signin" class="nav-link">
      <button
        class="btn btn-secondary light-button mr-lg-3 my-2 my-lg-0 form-rounded"
        type="button"
      >
        SIGN IN
      </button>
    </NavLink>
  );

  const signUpButton = (
    <NavLink key="SignUp" to="/signupchoice" class="nav-link">
      <button
        class="btn btn-secondary dark-button mr-lg-3 my-2 my-lg-0 form-rounded"
        type="button"
      >
        SIGN UP
      </button>
    </NavLink>
  );

  const buttons = [signUpButton, signInButton];
  return (
    <GeneralDialogBox
      show={props.show}
      onHide={props.onHide}
      buttons={buttons}
      title={'Sign in to add a ' + props.section}
      message={
        'You can only add ' +
        props.section +
        's if you are signed in. If you already have an account, click on sign in. To create an account, click on sign up.'
      }
    />
  );
}

export default SignInToAccess;
