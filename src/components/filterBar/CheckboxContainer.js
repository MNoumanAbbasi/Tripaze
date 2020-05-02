import React, { Component } from 'react';
import Checkbox from './Checkbox';

class CheckboxContainer extends Component {
  createCheckbox = (label) => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.props.handleCheckboxChange}
      key={label}
    />
  );

  createCheckboxes = () => this.props.items.map(this.createCheckbox);

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">{this.createCheckboxes()}</div>
        </div>
      </div>
    );
  }
}

export default CheckboxContainer;
