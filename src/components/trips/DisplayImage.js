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
      return coverPhoto;
    } else {
      this.setState({ url: spinner, complete: true });
      storage
        .ref('tripImages')
        .child(this.props.img)
        .getDownloadURL()
        .then((url) => {
          return url;
        });
    }
  };

  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
    const url = this.getUrl();
    if ((this._isMounted = true)) {
      this.setState({ url, complete: true });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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
