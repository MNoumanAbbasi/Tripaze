import React, { useState, useEffect } from 'react';
import storage from '../../config/fbConfig';
import coverPhoto from '../../Images/coverPhoto.jpg';
import spinner from '../../Images/Spinner.gif';

const CoverImage = (props) => {
  const [url, setUrl] = useState('');
  const [complete, setComplete] = useState(false);
  const folderName = props.type + 'Images';

  const getUrl = () => {
    return storage
      .ref(folderName)
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
    return (
      <img
        alt={`${props.type} Cover`}
        src={url}
        className="w-100 backDrop"
      ></img>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default CoverImage;
