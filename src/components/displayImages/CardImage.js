import React, { useState, useEffect } from 'react';
import storage from '../../config/fbConfig';
import coverPhoto from '../../Images/coverPhoto.jpg';
import spinner from '../../Images/Spinner.gif';

const CardImage = (props) => {
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
    // if no image linked, use default coverPhoto
    if (props.img === '') setUrl(coverPhoto);
    // else fetch from database
    else getUrl();
  }, []);

  return <img alt={`${props.type} Card`} className="card-img-top" src={url} />;
};

export default CardImage;
