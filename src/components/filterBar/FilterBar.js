import React, { Component } from 'react';
import CheckboxContainer from './CheckboxContainer';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { withRouter } from 'react-router-dom';

class FilterBar extends Component {
  state = {
    min: 0,
    max: 9999,
  };

  componentDidMount() {
    this.destinationsChecked = new Set();
    this.departuresChecked = new Set();
    this.companiesChecked = new Set();
  }

  handleChange = (e) => {
    this.setState({
      // is an email being entered or a password?
      [e.target.id]: e.target.value,
    });
  };

  toggleCheckboxDest = (label) => {
    if (this.destinationsChecked.has(label)) {
      this.destinationsChecked.delete(label);
    } else {
      this.destinationsChecked.add(label);
    }
  };

  toggleCheckboxDep = (label) => {
    if (this.departuresChecked.has(label)) {
      this.departuresChecked.delete(label);
    } else {
      this.departuresChecked.add(label);
    }
  };

  toggleCheckboxCompany = (label) => {
    if (this.companiesChecked.has(label)) {
      this.companiesChecked.delete(label);
    } else {
      this.companiesChecked.add(label);
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
    let companies = [];
    for (const comp of this.companiesChecked) {
      companies.push(comp);
    }
    this.props.history.push({
      pathname: '/searchResults',
      state: {
        dest: destinations,
        departureLocs: departures,
        comps: companies,
        priceMin: parseInt(this.state.min),
        priceMax: parseInt(this.state.max),
      },
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
    let companies = [];
    this.props.trips.map((trip) => {
      if (!companies.includes(trip.companyName))
        companies.push(trip.companyName);
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
        <DropdownButton id="dropdown-item-button" title="Companies">
          <CheckboxContainer
            handleCheckboxChange={this.toggleCheckboxCompany}
            items={companies}
          />
        </DropdownButton>
        <input
          onChange={this.handleChange}
          type="number"
          id="min"
          class="form-control mb-4"
          placeholder="Minimum Price (PKR)"
          required
        />
        <input
          onChange={this.handleChange}
          type="number"
          id="max"
          class="form-control mb-4"
          placeholder="Maximum Price (PKR)"
          required
        />
        <button className="btn btn-default" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default withRouter(FilterBar);
