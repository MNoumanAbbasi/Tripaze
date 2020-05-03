import React, { Component } from 'react';
import CheckboxContainer from './CheckboxContainer';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { withRouter } from 'react-router-dom';
import { Multiselect } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import RangeSlider from './Slider';
import Calendar from './Calendar';

class FilterBar extends Component {
  state = {
    min: 0,
    max: 9999,
    startDate: null,
    endDate: null,
  };

  // function onChange(value) {
  //   console.log('onChange: ', value);
  // }

  // function onAfterChange(value) {
  //   console.log('onAfterChange: ', value);
  // }

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
        <div id="popup1" class="popup-overlay">
          <div class="popup">
            <h3 className="text-center font-weight-bold">Advanced Search</h3>
            <a class="close" href="#">
              &times;
            </a>
            <div>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              <div className="popup-text">Dates</div>
              <Calendar />
=======
>>>>>>> 5b1864b... Added destinations drop down filter
=======
              <div className="popup-text">Dates</div>
              <Calendar2 />
>>>>>>> ef4228b... Added Data Range filter
              <div className="popup-text mt-3">Destinations</div>

              <Multiselect
                data={destinations}
                placeholder="Select Locations"
                className="mb-2"
              />
<<<<<<< HEAD
=======
>>>>>>> 06f62f2... Added departure locations drop down filter
=======
>>>>>>> 5b1864b... Added destinations drop down filter
              <div className="popup-text mt-3">Departure Locations</div>

              <Multiselect
                data={departures}
                placeholder="Select Locations"
                className="mb-2"
              />
<<<<<<< HEAD
=======
>>>>>>> 9d7e3eb... Added companies drop down filter
=======
>>>>>>> 06f62f2... Added departure locations drop down filter
              <div className="popup-text mt-3">Companies</div>

              <Multiselect
                data={companies}
                placeholder="Select Companies"
                className="mb-2"
              />
              <div className="popup-text mt-3 mb-3">Price Range (PKR)</div>

              <RangeSlider />
=======
>>>>>>> c790511... Added submit button in filter popup
=======
              <div className="popup-text mt-3 mb-3">Price Range (PKR)</div>

              <RangeSlider />
>>>>>>> d6a337f... Added price range slider in filiter bar
              {/* <input
                onChange={this.handleChange}
                type="number"
                id="min"
                class="form-control mb-4"
                placeholder="Minimum Price (PKR)"
                required
                autofocus
              />
              <input
                onChange={this.handleChange}
                type="number"
                id="max"
                class="form-control mb-4"
                placeholder="Maximum Price (PKR)"
                required
                autofocus
              /> */}
              <div className="">
                <button
                  className="btn btn-secondary dark-button "
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          {/* <Multiselect
          data={destinations}
          // onChange={(value) => this.toggleCheckboxDest({ value })}
          placeholder="Filter by Destinations"
        /> */}
          {/* <Calendar2 /> */}
          {/* <Demo /> */}
          {/* <Multiselect
          data={departures}
          placeholder="Filter by Departure Locations"
        />
        <Multiselect data={companies} placeholder="Filter by Companies" /> */}
          {/* <DropdownButton id="dropdown-item-button" title="Destinations">
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
        </DropdownButton> */}
          {/* <input
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
          autofocus
        /> */}
          {/* // <button className="btn btn-secondary dark-button" type="submit">
        //   Submit
        // </button>
      // </form> */}
        </div>
      </form>
    );
  }
}

export default withRouter(FilterBar);
