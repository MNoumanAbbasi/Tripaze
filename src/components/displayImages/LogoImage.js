import React, { useState, useEffect } from 'react';
import storage from '../../config/fbConfig';
import firebase from 'firebase';
import spinner from '../../Images/Spinner.gif';
import defaultLogo from '../../Images/image-unavailable.png';

//
// Logo image will always be of the company
// CompanyID is the id of company of which logo is required
// className includes the CSS styles to be applied to logo img
//
const LogoImage = ({ companyID, className }) => {
  const [url, setUrl] = useState(spinner);
  const folderName = 'companyLogoImages';

  // Get company logo name from db using company id
  const getImageName = () => {
    const db = firebase.firestore();
    const docRef = db.collection('Companies').doc(companyID);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const imageName = doc.data().logoImage;
        if (imageName === '') {
          setUrl(defaultLogo);
        } else {
          getUrl(imageName);
        }
      } else {
        console.log('Logo image name not found');
      }
    });
  };

  // Fetches the url of image stored in database
  const getUrl = (imageName) => {
    return storage
      .ref(folderName)
      .child(imageName)
      .getDownloadURL()
      .then((url) => {
        setUrl(url);
      })
      .catch((err) => {
        setUrl(defaultLogo);
        console.log('Logo image name not found in store');
      });
  };

  // Render the function once mounted
  useEffect(() => {
    getImageName();
  }, []);

  return <img alt="Logo" src={url} className={className} />;
};

export default LogoImage;
