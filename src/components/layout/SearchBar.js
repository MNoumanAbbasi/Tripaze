// Since this component has no state, this will be a functional component rather than a class component

import React from "react";
import { NavLink } from "react-router-dom";

const SearchBar = () => {
  return (
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
  );
};

export default SearchBar;
