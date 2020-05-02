import React, { Component } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
    };
  }

  render() {
    return (
      <div className="calendar-pos">
        <DateRangePicker
          startDate={this.props.startDate} // momentPropTypes.momentObj or null,
          startDateId="start" // PropTypes.string.isRequired,
          endDate={this.props.endDate} // momentPropTypes.momentObj or null,
          endDateId="end" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) =>
            this.props.storeDates(startDate, endDate)
          } // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={(focusedInput) => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />
        <br />
        <br />
      </div>
    );
  }
}

export default Calendar;
