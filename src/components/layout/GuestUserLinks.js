// Since this component has no state, this will be a functional component rather than a class component

import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';

const GuestUserLinks = () => {
  return (
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
      <SearchBar
        formClass="navbar-nav input-group form-group adjusted-form w-50 ml-auto mr-auto"
        inputClass="form-control form-rounded "
        centreSearchBar={false}
      />
      <ul class="navbar-nav navbar-fonts ml-auto justify-content-end">
        <li class="nav-item">
          <NavLink to="/signin" class="nav-link">
            <button
              class="btn btn-secondary light-button mr-lg-3 my-2 my-lg-0 form-rounded"
              type="button"
              data-cy="signinBtn"
            >
              SIGN IN
            </button>
          </NavLink>
        </li>
        <li class="nav-item">
          <NavLink to="/signupchoice" class="nav-link">
            <button
              class="btn btn-secondary dark-button mr-lg-3 my-2 my-lg-0 form-rounded"
              type="button"
            >
              SIGN UP
            </button>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

// Exporting to be used in app.js
export default GuestUserLinks;
