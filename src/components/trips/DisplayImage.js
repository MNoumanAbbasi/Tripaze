import React, { Component } from 'react';
import storage from '../../config/fbConfig';
import coverPhoto from '../../Images/coverPhoto.jpg';
import spinner from '../../Images/Spinner.gif';

class DisplayImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      complete: false,
    };
    this.getUrl = this.getUrl.bind(this);
  }

  getUrl = () => {
    if (this.props.img === '') {
      this.setState({ url: coverPhoto, complete: true });
    } else {
      this.setState({ url: spinner, complete: true });
      storage
        .ref('tripImages')
        .child(this.props.img)
        .getDownloadURL()
        .then((url) => {
          this.setState({ url, complete: true });
        });
    }
  };

  componentDidMount() {
    this.getUrl();
  }

  render() {
    // this.getUrl();
    if (this.state.complete) {
      if (this.props.page == 'details')
        return <img src={this.state.url} className="w-100 backDrop"></img>;
      else return <img class="card-img-top" src={this.state.url} alt="" />;
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default DisplayImage;
