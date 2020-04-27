import React, { useState, useEffect } from 'react';
import storage from '../../config/fbConfig';
import spinner from '../../Images/Spinner.gif';

const CardImage = (props) => {
  const [url, setUrl] = useState(spinner);
  const folderName = props.type + 'Images';
  // if no image available, use default coverPhoto
  if (props.img === '') setUrl(coverPhoto);

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
    getUrl();
  }, []);

  return <img alt={`${props.type} Card`} class="card-img-top" src={url} />;
};

export default CardImage;
