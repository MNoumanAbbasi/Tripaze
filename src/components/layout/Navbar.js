// Since this component has no state, this will be a functional component rather than a class component

import React from "react";
import { Link } from "react-router-dom";
import SignedInUserLinks from "./SignedInUserLinks";
import SignedInCompanyLinks from "./SignedInCompanyLinks";
import GuestUserLinks from "./GuestUserLinks";
import { connect } from "react-redux"; // note: we do not need firebaseConnect here since we do not need to be in connect to firestore. We need to just connect to our redux state
import logo from "../../logo.png";
import { profileType } from "../../Helpers";

const Navbar = (props) => {
  const { auth, profile } = props;

  let links = <GuestUserLinks />;

  if (profileType(auth, profile) === "Company") {
    links = <SignedInCompanyLinks profile={profile} />;
  } else if (profileType(auth, profile) === "User") {
    links = <SignedInUserLinks profile={profile} />;
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" class="navbar-brand">
        <img src={logo} className="brand-logo left logo" />
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      {links}
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.auth.currProfile,
  };
};

// Exporting to be used in app.js
export default connect(mapStateToProps)(Navbar);
