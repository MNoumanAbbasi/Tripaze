import React, { useState, useEffect } from 'react';
import storage from '../../config/fbConfig';
import defaultLogo from '../../Images/default-logo.jpg';
import spinner from '../../Images/Spinner.gif';

const LogoImage = (props) => {
  const [url, setUrl] = useState(spinner);
  const folderName = props.type + 'Images';

  const getUrl = () => {
    return storage
      .ref(folderName)
      .child(props.img)
      .getDownloadURL()
      .then((url) => {
        setUrl(url);
      });
  };

  useEffect(() => {
    // if no image linked, use default logo
    if (props.img === '') setUrl(defaultLogo);
    // else fetch from database
    else getUrl();
  }, []);

  return <img alt="Trip background" className="rounded-circle" src={url} />;
};

export default LogoImage;
