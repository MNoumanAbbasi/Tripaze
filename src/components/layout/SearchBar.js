// Since this component has no state, this will be a functional component rather than a class component

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

export class SearchBar extends Component {
  state = {
    destinations: '',
  };

  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
    // To remove the searched keyword when not on the searchResults page
    this.unlisten = this.props.history.listen((location, action) => {
      if (this._isMounted && !location.pathname.startsWith('/searchResults')) {
        this.setState({
          destinations: '',
        });
      }
    });
  }

  componentDidUnmount() {
    this._isMounted = false;
    this.unlisten();
  }

  handleChange = (e) => {
    this.setState({
      // store the input on form fields on the state
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    // dont want the default action of page being reloaded
    e.preventDefault();
    this.props.history.push({
      pathname: '/searchResults',
      state: {
        dest: [this.state.destinations],
        departureLocs: [],
        comps: [],
        priceMin: 0,
        priceMax: 999999,
      },
    });
  };

  render() {
    if (!this.props.searchBarVisible && !this.props.centreSearchBar) {
      return null;
    } else
      return (
        <form
          onSubmit={(e) => {
            this.handleSubmit(e);
          }}
          className={this.props.formClass}
        >
          <input
            className={this.props.inputClass}
            type="text"
            placeholder="Search trips..."
            aria-label="Search"
            id="destinations"
            value={this.state.destinations}
            onChange={this.handleChange}
          />

          <div className="input-group-append">
            <button
              className="btn btn-secondary change-color adjusted-btn border-0 form-rounded"
              type="submit"
            >
              <i class="fa fa-search"></i>
            </button>
          </div>
        </form>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    searchBarVisible: state.filters.showSearch,
  };
};

export default compose(connect(mapStateToProps), withRouter)(SearchBar);
