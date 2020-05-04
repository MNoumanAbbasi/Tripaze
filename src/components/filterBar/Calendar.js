import React, { Component } from 'react';
import { DatePicker } from 'antd';
import co from 'co';

const { RangePicker } = DatePicker;
class Calendar extends Component {
  render() {
    return (
      <div>
        <RangePicker
          inputReadOnly
          onChange={(vals) => this.props.onChange(vals)}
        />
      </div>
    );
  }
}

export default Calendar;
