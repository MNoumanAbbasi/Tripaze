// Since this component has no state, this will be a functional component rather than a class component

import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { compose } from "redux";

// this is a functional component, not a class, so we need to pass the props as argument
const SignedInUserLinks = (props) => {
  const initial = props.profile ? props.profile.userName : null;
  console.log(props);
  return (
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
      <div class="navbar-nav input-group form-group w-50 ml-auto mr-auto ">
        <input
          class="form-control form-rounded "
          type="search"
          placeholder="Search trips..."
          aria-label="Search"
        />

        <div class="input-group-append">
          <button
            class="btn btn-secondary change-color border-0 form-rounded"
            type="button"
          >
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>

      <ul class="navbar-nav navbar-fonts justify-content-end">
        <li class="nav-item">
          <NavLink to="/" class="nav-link">
            {initial}
          </NavLink>
        </li>
        <li class="nav-item ">
          <a
            class="nav-link"
            onClick={() => {
              props.signOut(props.history);
            }}
          >
            Sign Out
          </a>
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
