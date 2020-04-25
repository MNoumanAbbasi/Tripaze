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
    return storage
      .ref('tripImages')
      .child(this.props.img)
      .getDownloadURL()
      .then((url) => {
        if ((this._isMounted = true)) {
          this.setState({ url, complete: true });
        }
      });
  };

  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
    let url = spinner;
    if (this.props.img === '') {
      url = coverPhoto;
      if ((this._isMounted = true)) {
        this.setState({ url, complete: true });
      }
    } else {
      this.getUrl();
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
