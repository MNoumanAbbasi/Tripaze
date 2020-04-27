import React, { useState, useEffect } from 'react';
import storage from '../../config/fbConfig';
import spinner from '../../Images/Spinner.gif';

const CardImage = (props) => {
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
    setUrl(url);
    setComplete(true);
    getUrl();
    return () => {
      _isMounted = false;
    };
  }, []);

  if (complete) {
    return <img alt={`${props.type} background`} class="card-img-top" src={url} />;
  } else {
    return <div>Loading...</div>;
  }
};

export default CardImage;
