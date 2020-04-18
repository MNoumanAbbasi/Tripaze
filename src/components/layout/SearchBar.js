// Since this component has no state, this will be a functional component rather than a class component

import React from "react";
import { NavLink } from "react-router-dom";

const SearchBar = () => {
  return (
    <form
      onSubmit={(e) => {
        console.log(e);
      }}
      className="navbar-nav input-group form-group adjusted-form w-50 ml-auto mr-auto "
    >
      <input
        class="form-control form-rounded "
        type="text"
        placeholder="Search trips..."
        aria-label="Search"
      />

      <div class="input-group-append">
        <button
          class="btn btn-secondary change-color adjusted-btn border-0 form-rounded"
          type="submit"
        >
          <i class="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
