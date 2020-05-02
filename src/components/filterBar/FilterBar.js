import React, { Component } from 'react';
import CheckboxContainer from './CheckboxContainer';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { withRouter } from 'react-router-dom';
import Calendar from './Calendar';

class FilterBar extends Component {
  state = {
    min: 0,
    max: 9999,
    startDate: null,
    endDate: null,
  };

  componentDidMount() {
    this.destinationsChecked = new Set();
    this.departuresChecked = new Set();
    this.companiesChecked = new Set();
  }

  storeDates = (start, end) => {
    this.setState({
      startDate: start,
      endDate: end,
    });
  };

  handleChange = (e) => {
    this.setState({
      // is an email being entered or a password?
      [e.target.id]: e.target.value,
    });
  };

  // To store the state of checkboxes
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
    let end = null;
    let start = null;
    if (this.state.endDate) end = this.state.endDate.toDate();
    if (this.state.startDate) end = this.state.startDate.toDate();
    this.props.history.push({
      pathname: '/searchResults',
      state: {
        dest: destinations,
        departureLocs: departures,
        comps: companies,
        priceMin: parseInt(this.state.min),
        priceMax: parseInt(this.state.max),
        startDate: start,
        endDate: end,
      },
    });
  };

  render() {
    let destinations = [];
    this.props.trips.forEach((trip) => {
      trip.destinations.forEach((dest) => {
        if (!destinations.includes(dest)) destinations.push(dest);
      });
    });
    let departures = [];
    this.props.trips.forEach((trip) => {
      if (!departures.includes(trip.departureLoc))
        departures.push(trip.departureLoc);
    });
    let companies = [];
    this.props.trips.forEach((trip) => {
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
        />
        <input
          onChange={this.handleChange}
          type="number"
          id="max"
          class="form-control mb-4"
          placeholder="Maximum Price (PKR)"
        />
        <Calendar
          storeDates={this.storeDates}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
        />
        <button className="btn btn-default" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default withRouter(FilterBar);
