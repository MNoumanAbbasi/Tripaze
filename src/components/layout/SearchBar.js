// Since this component has no state, this will be a functional component rather than a class component

import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";

export class SearchBar extends Component {
  state = {
    destinations: "",
  };

  handleChange = (e) => {
    this.setState({
      // store the input on form fields on the state
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    console.log(this.state);
    // dont want the default action of page being reloaded
    e.preventDefault();
    this.props.history.push("/searchResults/" + this.state.destinations);
  };

  render() {
    return (
      <form
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
        className="navbar-nav input-group form-group adjusted-form w-50 ml-auto mr-auto "
      >
        <input
          class="form-control form-rounded "
          type="text"
          placeholder="Search trips..."
          aria-label="Search"
          id="destinations"
          onChange={this.handleChange}
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
  }
}

export default withRouter(SearchBar);
