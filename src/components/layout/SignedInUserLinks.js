// Since this component has no state, this will be a functional component rather than a class component

import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { compose } from 'redux';
import SearchBar from './SearchBar';

// this is a functional component, not a class, so we need to pass the props as argument
const SignedInUserLinks = (props) => {
  const initial = props.profile ? props.profile.userName : null;
  return (
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
      <SearchBar
        formClass="navbar-nav input-group form-group adjusted-form w-50 ml-auto mr-auto"
        inputClass="form-control form-rounded "
        centreSearchBar={false}
      />
      <ul class="navbar-nav navbar-fonts ml-auto justify-content-end">
        <li class="nav-item">
          <NavLink to="/" class="nav-link">
            {initial}
          </NavLink>
        </li>
        <li class="nav-item ">
          <li class="nav-item ">
            <NavLink
              to="/"
              class="nav-link"
              onClick={() => {
                props.signOut(props.history);
              }}
              data-cy="signout"
            >
              Sign Out
            </NavLink>
          </li>
        </li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: (history) => dispatch(signOut(history)),
  };
};

// Exporting to be used in app.js
export default compose(
  connect(null, mapDispatchToProps),
  withRouter
)(SignedInUserLinks);
