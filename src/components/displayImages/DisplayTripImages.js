import React, { useState, useEffect } from 'react';
import storage from '../../config/fbConfig';
import coverPhoto from '../../Images/coverPhoto.jpg';
import spinner from '../../Images/Spinner.gif';

const DisplayTripImages = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     url: '',
  //     complete: false,
  //   };
  //   this.getUrl = this.getUrl.bind(this);
  // }
  const [url, setUrl] = useState('');
  const [complete, setComplete] = useState(false);

  const getUrl = () => {
    return storage
      .ref('tripImages')
      .child(props.img)
      .getDownloadURL()
      .then((url) => {
        if (_isMounted === true) {
          setUrl(url);
          setComplete(true);
        }
      });
  };

  let _isMounted = false;
  useEffect(() => {
    _isMounted = true;
    let url = spinner;
    if (props.img === '') {
      setUrl(coverPhoto);
      setComplete(true);
    } else {
      setUrl(url);
      setComplete(true);
      getUrl();
    }
    return () => {
      _isMounted = false;
    };
  }, []);

  if (complete) {
    if (props.page === 'details') // if we are on the trip details page
      return (
        <img
          alt="Trip background"
          src={url}
          className="w-100 backDrop"
        ></img>
      );
    else
      return (
        <img alt="Trip background" class="card-img-top" src={url} />
      );
  } else {
    return <div>Loading...</div>;
  }
};

export default DisplayTripImages;
