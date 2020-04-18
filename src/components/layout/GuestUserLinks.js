// Since this component has no state, this will be a functional component rather than a class component

import React from "react";
import { NavLink } from "react-router-dom";

const GuestUserLinks = () => {
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
          <NavLink to="/signin" class="nav-link">
            <button
              class="btn btn-secondary signin-button mr-lg-3 my-2 my-lg-0 form-rounded"
              type="button"
            >
              SIGN IN
            </button>
          </NavLink>
        </li>
        <li class="nav-item">
          <NavLink to="/signupchoice" class="nav-link">
            <button
              class="btn btn-secondary change-color border-0 form-rounded"
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
