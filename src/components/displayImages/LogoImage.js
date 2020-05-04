import React, { useState, useEffect } from 'react';
import storage from '../../config/fbConfig';
import firebase from 'firebase';
import spinner from '../../Images/Spinner.gif';

// Logo image will always be of the company
// CompanyID is the id of company of which logo is required
// Style includes the CSS styles for logo size
const LogoImage = ({ companyID, style }) => {
  const [url, setUrl] = useState(spinner);
  const folderName = 'companyLogoImages';

  // Get company logo name from db using company id
  const getImageName = () => {
    const db = firebase.firestore();
    const docRef = db.collection('Companies').doc(companyID);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const imageName = doc.data().logoImage;
        getUrl(imageName);
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
      });
  };

  // Render the function once mounted
  useEffect(() => {
    getImageName();
  }, []);

  return (
    <div className="img-fluid overlay row justify-content-lg-end justify-content-center">
      <img
        alt="Logo"
        className="border-turq tb-border rounded-circle"
        style={style}
        src={url}
      />
    </div>
  );
};

// Map state from store to props in component
// const mapStateToProps = (state, ownProps) => {
//   const companies = state.firestore.data.Companies;
//   const company = companies ? companies['3OAS4ZfMJmXpTWnko9tJBUYfijj2'] : null;
//   const image = company ? company.logoImage : '';
//   const requests = state.firestore.status.requesting;
//   const isLoading = requests;
//   return {
//     image: image,
//     isLoading: isLoading,
//   };
// };

export default LogoImage;
// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect((props) => [
//     { collection: 'Companies', doc: '3OAS4ZfMJmXpTWnko9tJBUYfijj2' },
//   ])
// )(LogoImage);
