import React, { Component } from 'react';
import CheckboxContainer from './CheckboxContainer';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { withRouter } from 'react-router-dom';

class FilterBar extends Component {
  componentDidMount() {
    this.destinationsChecked = new Set();
    this.departuresChecked = new Set();
  }

  toggleCheckboxDest = (label) => {
    console.log(label);
    if (this.destinationsChecked.has(label)) {
      this.destinationsChecked.delete(label);
    } else {
      this.destinationsChecked.add(label);
    }
  };

  toggleCheckboxDep = (label) => {
    console.log(label);
    if (this.departuresChecked.has(label)) {
      this.departuresChecked.delete(label);
    } else {
      this.departuresChecked.add(label);
    }
  };

  handleFormSubmit = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();
    let destinations = [];
    for (const dest of this.destinationsChecked) {
      destinations.push(dest);
    }
    let departures = [];
    for (const dep of this.departuresChecked) {
      departures.push(dep);
    }
    this.props.history.push({
      pathname: '/searchResults',
      state: { dest: destinations, departureLocs: departures },
    });
  };

  render() {
    let destinations = [];
    this.props.trips.map((trip) => {
      trip.destinations.map((dest) => {
        if (!destinations.includes(dest)) destinations.push(dest);
      });
    });
    let departures = [];
    this.props.trips.map((trip) => {
      if (!departures.includes(trip.departureLoc))
        departures.push(trip.departureLoc);
    });
    return (
      <form onSubmit={this.handleFormSubmit}>
        <DropdownButton id="dropdown-item-button" title="Destinations">
          <CheckboxContainer
            handleCheckboxChange={this.toggleCheckboxDest}
            items={destinations}
          />
        </DropdownButton>
        <DropdownButton id="dropdown-item-button" title="Departure Locations">
          <CheckboxContainer
            handleCheckboxChange={this.toggleCheckboxDep}
            items={departures}
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
