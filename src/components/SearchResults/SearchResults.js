import React from 'react';
import TripsList from '../trips/TripsList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'; // higher order
import LoadingBox from '../dashboard/LoadingBox';
import { NoTripsFound } from '../modals/StandardModals';

const today = new Date();
const SearchResults = (props) => {
  const { trips, isLoading } = props;
  const isInitialized = !isLoading && trips;
  if (isInitialized) {
    let filteredTrips = trips;
    // If any one of the filters have been used, then filter trips accordingly
    if (
      props.location.state.dest.length ||
      props.location.state.departureLocs.length ||
      props.location.state.comps.length ||
      props.location.state.endDate
    )
      filteredTrips = trips.filter((trip) => {
        // only show upcoming trips
        if (trip.departureDate.toDate().getTime() < today.getTime())
          return false;
        let show = false;
        let filteredDest;
        let filteredDep;
        let filteredCompanies;
        for (filteredDest of props.location.state.dest) {
          if (trip.destinationsLowerCase.includes(filteredDest.toLowerCase())) {
            show = true;
            break;
          }
        }
        for (filteredDep of props.location.state.departureLocs) {
          if (trip.departureLoc === filteredDep) {
            show = true;
            break;
          }
        }
        for (filteredCompanies of props.location.state.comps) {
          if (trip.companyName === filteredCompanies) {
            show = true;
            break;
          }
        }
        // if filter for date selected
        if (props.location.state.startDate && props.location.state.endDate) {
          const tripDeparture = trip.departureDate.toDate().getTime();
          const startDate = props.location.state.startDate.getTime();
          const endDate = props.location.state.endDate.getTime();
          // show trip only if the departure date falls in the range provided
          show = tripDeparture >= startDate && tripDeparture <= endDate;
        }
        return show;
      });

    if (filteredTrips.length > 0) {
      // Show plural "trips" when more than one trip returned
      const message =
        filteredTrips.length == 1
          ? filteredTrips.length + ' trip matched the search'
          : filteredTrips.length + ' trips matched the search';
      return (
        <div className="container cardslist-margin">
          <div className="d-flex justify-content-center search-results ">
            <h2 className="font-color-grey change-font">
              {'Search Results: ' + message}
            </h2>
          </div>
          <TripsList trips={filteredTrips} isCompProfile={false} />
        </div>
      );
    } else {
      NoTripsFound(props.history);
      return (
        <div className="container cardslist-margin">
          <div className="d-flex justify-content-center search-results ">
            <h2 className="font-color-grey change-font">Search Results</h2>
          </div>
        </div>
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
  firestoreConnect((props) => {
    const priceMin = props.location.state ? props.location.state.priceMin : 0;
    const priceMax = props.location.state
      ? props.location.state.priceMax
      : 50000;
    return [
      {
        collection: 'Trips',
        where: [
          ['price', '>=', priceMin],
          ['price', '<=', priceMax],
        ],
      },
    ];
  })
)(SearchResults);
