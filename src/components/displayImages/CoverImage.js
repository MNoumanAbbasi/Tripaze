import React, { useState, useEffect } from 'react';
import storage from '../../config/fbConfig';
import defaultCover from '../../Images/coverPhoto.jpg';
import spinner from '../../Images/Spinner.gif';

const CoverImage = (props) => {
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
    if (props.img === '') setUrl(defaultCover);
    // else fetch from database
    else getUrl();
  }, []);

  return (
    <img alt={`${props.type} Cover`} src={url} className="w-100 backDrop"></img>
  );
};

export default CoverImage;
