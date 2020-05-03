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
          //with clear dates button
          initialStartDate={{
            _isAMomentObject: true,
            _isUTC: false,
            _pf: {
              empty: false,
              unusedTokens: [],
              unusedInput: [],
            },
          }}
          initialEndDate={{
            _isAMomentObject: true,
            _isUTC: false,
            _pf: {
              empty: false,
              unusedTokens: [],
              unusedInput: [],
            },
          }}
          readOnly
          verticalHeight={370}
          orientation="vertical"
          showClearDates
          hideKeyboardShortcutsPanel
          autoFocus
          showDefaultInputIcon //to show calendar icon
          reopenPickerOnClearDates
          displayFormat="MMM D"
          numberOfMonths={1} //to show only one month
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) =>
            this.setState({ startDate, endDate })
          } //PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={(focusedInput) => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />
      </div>
    );
  }
}

export default Calendar;
