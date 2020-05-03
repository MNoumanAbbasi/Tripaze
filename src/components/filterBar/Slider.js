import React, { Component } from 'react';
import { Slider } from 'antd';
import 'antd/dist/antd.css';

class RangeSlider extends Component {
  //   onChange = (value) => {
  //     console.log('onChange: ', value);
  //   };

  minimum = 0;
  maximum = 50000;
  defaultVal = [5000, 20000];
  state = {
    inputValue: this.defaultVal,
  };

  onChange1 = (value) => {
    this.setState({
      inputValue: value,
    });
  };

  onChange2 = (value) => {
    this.setState({
      inputValue: value,
    });
  };

  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
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
      />
    );
  }
}

export default RangeSlider;
