import React, { useState, useEffect } from 'react';
import storage from '../../config/fbConfig';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'; // higher order
import defaultLogo from '../../Images/default-logo.jpg';
import spinner from '../../Images/Spinner.gif';

// Logo image will always be of the company

const LogoImage = (props) => {
  // const [url, setUrl] = useState(defaultLogo);
  let url = defaultLogo;
  const folderName = 'companyLogoImages';

  const getUrl = () => {
    if (props.image != null) {
      return storage
        .ref(folderName)
        .child(props.image)
        .getDownloadURL()
        .then((ur) => {
          // setUrl(url);
          url = ur;
        });
    }
  };

  useEffect(() => {
    // if image loaded and there is an image set
    console.log('here');
    if (!props.isLoading) getUrl();
  }, []);

  return (
    <div className="img-fluid overlay row justify-content-lg-end justify-content-center">
      <img
        alt="Logo"
        className="border-turq tb-border rounded-circle"
        style={{ height: '100px', width: '100px' }}
        src={url}
      />
    </div>
  );
};

// Map state from store to props in component
const mapStateToProps = (state, ownProps) => {
  const companies = state.firestore.data.Companies;
  const company = companies ? companies[ownProps.companyID] : null;
  const image = company ? company.logoImage : '';
  const requests = state.firestore.status.requesting;
  const isLoading = requests;
  return {
    image: image,
    isLoading: isLoading,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    { collection: 'Companies', doc: props.companyID },
  ])
)(LogoImage);
