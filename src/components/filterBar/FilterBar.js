import React, { Component } from 'react';
import CheckboxContainer from './CheckboxContainer';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { withRouter } from 'react-router-dom';

class FilterBar extends Component {
  componentDidMount() {
    this.destinationsChecked = new Set();
  }

  toggleCheckbox = (label) => {
    console.log(label);
    if (this.destinationsChecked.has(label)) {
      this.destinationsChecked.delete(label);
    } else {
      this.destinationsChecked.add(label);
    }
  };

  handleFormSubmit = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();
    let destinations = [];
    for (const dest of this.destinationsChecked) {
      destinations.push(dest);
    }
    this.props.history.push({
      pathname: '/searchResults',
      state: { dest: destinations },
    });
  };

  render() {
    let destinations = [];
    this.props.trips.map((trip) => {
      trip.destinations.map((dest) => {
        if (!destinations.includes(dest)) destinations.push(dest);
      });
    });
    return (
      <form onSubmit={this.handleFormSubmit}>
        <DropdownButton id="dropdown-item-button" title="Destinations">
          <CheckboxContainer
            handleCheckboxChange={this.toggleCheckbox}
            items={destinations}
          />
        </DropdownButton>

        <button className="btn btn-default" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default withRouter(FilterBar);
