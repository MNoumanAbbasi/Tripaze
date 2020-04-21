import React, { Component } from 'react';
import TripsList from '../trips/TripsList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase'; // higher order
import { Redirect } from 'react-router-dom';
import { profileType } from '../../Helpers';
import logo_wt from '../../Images/logo-without-text.jpg';
import background from '../../Images/HomepageImage.jpg';

// 6 columns on medium and 12 column on small screens
class Dashboard extends Component {
  render() {
    // console.log(this.props)
    const { trips, profile, auth, isLoading } = this.props;
    const isInitialized = trips && !isLoading;

    // If company is logged in, redirect to company profile
    if (profileType(auth, profile) === 'Company') {
      return <Redirect to={'/companyprofile/' + auth.uid} />;
    }

    if (isInitialized) {
      console.log('Trippy', trips);
      return (
        <div className="homePage">
          <img src={background} className="img-fluid mw-100"></img>
          <hr className="greenline mw-100"></hr>

          <div className="row justify-content-md-around justify-content-center align-items-end">
            <h1 className="home-heading order-2 order-md-1">ALL TRIPS</h1>
            {/* <hr className="underline"></hr> */}
            <img
              src={logo_wt}
              className=" img-fluid logo-no-text order-1 order-md-2"
            ></img>
          </div>
          <div className="container cardslist-margin">
            <TripsList trips={trips} />
          </div>
        </div>
      );
    } else {
      // to show page reload while trips are being requested
      return <div>Loading...</div>;
    }
  }
}
// Map state from store to props in component
const mapStateToProps = (state) => {
  // console.log('Dashboard', state);
  const requests = state.firestore.status.requesting;
  const isLoading = requests
    ? Object.values(requests).some((value) => value === true)
    : null;
  return {
    trips: state.firestore.ordered.Trips,
    auth: state.firebase.auth,
    profile: state.auth.currProfile,
    isLoading: isLoading,
  };
};

export default compose(
  connect(mapStateToProps),
  // tells us which collections to connect to in our firebase project whenever this component, namely dashboard, is active
  // Whenever collection trip is changed, it would call the firestore reducer which would update the state of this firestore
  firestoreConnect([{ collection: 'Trips' }])
)(Dashboard);
