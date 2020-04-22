import React, { Component } from 'react';
import storage from '../../config/fbConfig';

class DisplayImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
    this.getUrl = this.getUrl.bind(this);
  }
  getUrl = () => {
    storage
      .ref('tripImages')
      .child(this.props.img)
      .getDownloadURL()
      .then((url) => {
        this.setState({ url });
      });
  };
  render() {
    this.getUrl();
    return <img src={this.state.url} className="w-100 backDrop"></img>;
  }
}

export default DisplayImage;
