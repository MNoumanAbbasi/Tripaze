import React, { Component } from "react";
import TripsList from "../trips/TripsList";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase"; // higher order

// 6 columns on medium and 12 column on small screens
class SearchResults extends Component {
  render() {
    const { trips, isLoading } = this.props;
    const isInitialized = !isLoading && trips && company;
    if (isInitialized) {
      return (
        <div className="dashboard container">
          <div className="row">
            <div className="col s12 m6">
              <TripsList trips={trips} />
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

// Map state from store to props in component
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const requests = state.firestore.status.requesting;
  const isLoading = requests
    ? Object.values(requests).some((value) => value === true)
    : null;
  return {
    trips: state.firestore.ordered.Trips,
    profile: state.auth.currProfile,
    isLoading: isLoading, // all must be loaded
  };
};

export default compose(
  connect(mapStateToProps),
  // tells us which collections to connect to in our firebase project whenever this component, namely dashboard, is active
  // Whenever collection trip is changed, it would call the firestore reducer which would update the state of this firestore
  firestoreConnect((props) => [
    {
      collection: "Trips",
      where: [["destinations", "==", props.match.params.dest]],
    },
  ])
)(SearchResults);
