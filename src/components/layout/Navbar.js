// Since this component has no state, this will be a functional component rather than a class component

import React from 'react';
import { Link } from 'react-router-dom';
import SignedInUserLinks from './SignedInUserLinks';
import SignedInCompanyLinks from './SignedInCompanyLinks';
import GuestUserLinks from './GuestUserLinks';
import { connect } from 'react-redux'; // note: we do not need firebaseConnect here since we do not need to be in connect to firestore. We need to just connect to our redux state
import logo from '../../logo.png';

const Navbar = (props) => {
  const { auth, profile } = props;
  const links = <GuestUserLinks />;

  if (auth.uid && profile.currProfile) {
    if (profile.currProfile.type === 'Company') {
      links = <SignedInCompanyLinks profile={profile.currProfile} />;
    } else {
      links = <SignedInUserLinks profile={profile.currProfile} />;
    }
  }

  return (
    // all classnames are through material UI. Link is to homepage
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <img className="logo" src={logo} alt="logo" />
        {links}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.auth,
  };
};

// Exporting to be used in app.js
export default connect(mapStateToProps)(Navbar);
