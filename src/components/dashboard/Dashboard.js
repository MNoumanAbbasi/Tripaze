import React, { Component } from "react";
import Notifications from "./Notifications";
import TripsList from "../trips/TripsList";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase"; // higher order
import { Redirect } from "react-router-dom";

// 6 columns on medium and 12 column on small screens
class Dashboard extends Component {
  render() {
    // console.log(this.props)
    const { trips, profile, auth } = this.props;

    // If company is logged in, redirect to company profile
    if (profile && profile.type === "Company") {
      return <Redirect to={"/companyprofile/" + auth.uid} />;
    }

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <TripsList trips={trips} />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications />
          </div>
        </div>
      </div>
    );
  }
}
// Map state from store to props in component
const mapStateToProps = (state) => {
  //   console.log("Dashboard", state);
  return {
    trips: state.firestore.ordered.Trips,
    auth: state.firebase.auth,
    profile: state.auth.currProfile,
  };
};

export default compose(
  connect(mapStateToProps),
  // tells us which collections to connect to in our firebase project whenever this component, namely dashboard, is active
  // Whenever collection trip is changed, it would call the firestore reducer which would update the state of this firestore
  firestoreConnect([{ collection: "Trips" }])
)(Dashboard);
