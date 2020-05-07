import React from 'react';
import TripsList from '../trips/TripsList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import LoadingBox from '../dashboard/LoadingBox';
import { NoTripsFound } from '../modals/StandardModals';

const SearchResults = (props) => {
  const { trips, isLoading } = props;

  // if data has completely been fetched from Firestore, display the search results page
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
      // Filtering trips
      filteredTrips = trips.filter((trip) => {
        // only show upcoming trips
        const today = new Date();
        if (trip.departureDate.toDate().getTime() < today.getTime())
          return false;

        let showTrip = false;
        let filteredDestinations;
        let filteredDepartures;
        let filteredCompanies;

        // Check each destination in filters and check if they match the lower case versions in the database
        for (filteredDestinations of props.location.state.dest) {
          if (
            trip.destinationsLowerCase.includes(
              filteredDestinations.toLowerCase()
            )
          ) {
            showTrip = true;
            break;
          }
        }

        // Check each departure location in filters and check if they match the the departure location of the trip
        for (filteredDepartures of props.location.state.departureLocs) {
          if (trip.departureLoc === filteredDepartures) {
            showTrip = true;
            break;
          }
        }

        // Check each comapny in filters and check if they match the the company of the trip
        for (filteredCompanies of props.location.state.comps) {
          if (trip.companyName === filteredCompanies) {
            showTrip = true;
            break;
          }
        }

        // if filter for date selected
        if (props.location.state.startDate && props.location.state.endDate) {
          const tripDeparture = trip.departureDate.toDate().getTime();
          const startDate = props.location.state.startDate.getTime();
          const endDate = props.location.state.endDate.getTime();
          // show trip only if the departure date falls in the range provided
          showTrip = tripDeparture >= startDate && tripDeparture <= endDate;
        }
        return showTrip;
      });

    // If any trips found
    if (filteredTrips.length > 0) {
      // Show plural "trips" when more than one trip returned
      const message =
        filteredTrips.length === 1
          ? filteredTrips.length + ' trip found'
          : filteredTrips.length + ' trips found';

      // display the filtered trips as trip cards
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
      // Else if no trips found, display dialog box indicating so
      NoTripsFound(props.history);
      return (
        <div className="container cardslist-margin">
          <div className="d-flex justify-content-center search-results ">
            <h2 className="font-color-grey change-font">
              Search Results: No trips found
            </h2>
          </div>
        </div>
      );
    }
  }
  // Show a loading box if firesstore has not responded to the initial query yet
  else {
    return <LoadingBox />;
  }
};

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
        // Do price filtering at the backend
        where: [
          ['price', '>=', priceMin],
          ['price', '<=', priceMax],
        ],
      },
    ];
  })
)(SearchResults);
