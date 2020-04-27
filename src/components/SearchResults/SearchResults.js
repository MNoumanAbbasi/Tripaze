import React from 'react';
import TripsList from '../trips/TripsList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'; // higher order
import LoadingBox from '../dashboard/LoadingBox';
import NoTripsFound from '../dialogBoxes/NoTripsFound';

const SearchResults = (props) => {
  const [modalShow, setModalShow] = React.useState(true);
  const { trips, isLoading } = props;
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
        <NoTripsFound
          show={modalShow}
          onHide={() => setModalShow(false)}
          dest={props.match.params.dest}
        />
      );
    }
  } else {
    return <LoadingBox />;
  }
};

// Map state from store to props in component
const mapStateToProps = (state, ownprops) => {
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
