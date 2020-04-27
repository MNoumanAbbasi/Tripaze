import React, { useState, useEffect } from 'react';
import storage from '../../config/fbConfig';
import coverPhoto from '../../Images/coverPhoto.jpg';
import spinner from '../../Images/Spinner.gif';

const CoverImage = (props) => {
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

  return (
    <img alt={`${props.type} Cover`} src={url} className="w-100 backDrop"></img>
  );
};

export default CoverImage;
