import React, { Component } from 'react';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;
class Calendar extends Component {
  render() {
    return (
      <div>
        <RangePicker inputReadOnly />
      </div>
    );
  }
}

export default Calendar;
