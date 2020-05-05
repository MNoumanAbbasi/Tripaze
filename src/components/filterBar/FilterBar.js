import React, { Component } from 'react';
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
    dests: [],
    departureLocs: [],
    comps: [],
  };

  handleFormSubmit = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();

    let end = null;
    let start = null;
    if (this.state.startDate) start = this.state.startDate.toDate();
    if (this.state.endDate) end = this.state.endDate.toDate();

    this.props.history.push({
      pathname: '/searchResults',
      state: {
        dest: this.state.dests,
        departureLocs: this.state.departureLocs,
        comps: this.state.comps,
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
    destinations = destinations.sort(); // to display locations alphabetically
    let departures = [];
    this.props.trips.forEach((trip) => {
      if (!departures.includes(trip.departureLoc))
        departures.push(trip.departureLoc);
    });
    departures = departures.sort(); // to display locations alphabetically
    let companies = [];
    this.props.trips.forEach((trip) => {
      if (!companies.includes(trip.companyName))
        companies.push(trip.companyName);
    });
    companies = companies.sort(); // to display companies alphabetically
    return (
      <form onSubmit={this.handleFormSubmit} className="greenline-fix">
        <div id="popup1" class="popup-overlay">
          <div class="popup">
            <h3 className="text-center font-weight-bold">Advanced Search</h3>
            <a class="close" href="#">
              &times;
            </a>
            <div>
              <div className="popup-text">Dates</div>
              <Calendar
                onChange={(values) =>
                  this.setState({ startDate: values[0], endDate: values[1] })
                }
              />
              <div className="popup-text mt-3">Destinations</div>
              <Multiselect
                data={destinations}
                placeholder="Select Locations"
                className="mb-2"
                onChange={(dests) => this.setState({ dests })}
              />
              <div className="popup-text mt-3">Departure Locations</div>
              <Multiselect
                data={departures}
                placeholder="Select Locations"
                className="mb-2"
                onChange={(departureLocs) => this.setState({ departureLocs })}
              />
              <div className="popup-text mt-3">Companies</div>
              <Multiselect
                data={companies}
                placeholder="Select Companies"
                className="mb-2"
                onChange={(comps) => this.setState({ comps })}
              />
              <div className="popup-text mt-3 mb-3">
                Price Range (Selected: Rs{' '}
                {this.state.min
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                to Rs{' '}
                {this.state.max
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                )
              </div>
              <RangeSlider
                onChange={(values) =>
                  this.setState({ min: values[0], max: values[1] })
                }
                defaultVal={[this.state.min, this.state.max]}
              />

              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-secondary dark-button "
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(FilterBar);
