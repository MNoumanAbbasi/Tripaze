import React, { Component } from 'react';
import { Slider } from 'antd';
import 'antd/dist/antd.css';

class RangeSlider extends Component {
  minimum = 0;
  maximum = 50000;
  defaultVal = this.props.defaultVal;
  state = {
    inputValue: this.defaultVal,
  };

  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
    this.props.onChange(value);
  };

  render() {
    const { inputValue } = this.state;
    return (
      <Slider
        range
        onChange={this.onChange}
        defaultValue={this.defaultVal}
        min={this.minimum}
        max={this.maximum}
        value={inputValue}
        step={100}
      />
    );
  }
}

export default RangeSlider;
