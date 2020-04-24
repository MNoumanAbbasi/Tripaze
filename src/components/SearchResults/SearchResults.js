import React, { Component } from 'react';
import TripsList from '../trips/TripsList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'; // higher order

// 6 columns on medium and 12 column on small screens
class SearchResults extends Component {
  render() {
    const { trips, isLoading } = this.props;
    console.log('Trips', trips);
    const isInitialized = !isLoading && trips;
    if (isInitialized) {
      if (trips.length > 0) {
        return (
          <div className="container cardslist-margin">
            <TripsList trips={trips} />
          </div>
        );
      } else {
        return (
          <div>
            No trips found with destination "{this.props.match.params.dest}"
          </div>
        );
      }
    } else {
      return <div>Loading...</div>;
    }
  }
}

// Map state from store to props in component
const mapStateToProps = (state, ownprops) => {
  console.log(ownprops);
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
      collection: 'Trips',
      where: [
        [
          'destinationsLowerCase',
          'array-contains',
          props.match.params.dest.toLowerCase(),
        ],
      ],
    },
  ])
)(SearchResults);
