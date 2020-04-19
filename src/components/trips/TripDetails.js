import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import FAQSection from './FAQSection';
import EditTrip from './EditTrip';
// import { Redirect } from 'react-router-dom'

// class container section is material
// class trip-details is from our own css
// taking props to know which trip to load
function TripDetails(props) {
  const { trip, isLoading, profile, auth } = props; // getting trip category from props
  const isInitialized = !isLoading && profile && trip;

  if (!isInitialized) {
    return <div>Loading...</div>;
  }
  // TODO
  // if (auth.uid is a company id) {
  //      show trip details page from company perspective
  // }
  var deleteButton = null;
  var editButton = null;
  const adminMode = auth.uid === trip.companyId;
  if (adminMode) {
    editButton = (
      <button
        onClick={() => props.history.push('/edittrip/' + props.match.params.id)}
      >
        Edit Trip
      </button>
    );
    deleteButton = <button>Delete Trip</button>;
  }
  return (
    <div className="container section trip-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">{trip.title}</span>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div>
            {' '}
            Company:
            <Link to={'/companyProfile/' + trip.companyId}>
              {' ' + trip.companyName}
            </Link>
          </div>
          <div>Cost: Rs. {trip.price}</div>
          <div>To: {trip.destinations}</div>
          <div>On: {trip.departureDate}</div>
          <div>From: {trip.departureLoc}</div>
          <div>Description: {trip.description}</div>
          <div>Attractions: {trip.attraction}</div>
        </div>
        <FAQSection />
        {editButton}
        {deleteButton}
      </div>
    </div>
  );
}

// ownProps are the props of the component before we attach anything to it
const mapStateToProps = (state, ownProps) => {
  console.log('trip', state);
  const id = ownProps.match.params.id;
  const trips = state.firestore.data.Trips; // using data instead of ordered here since we are interested in referencing specific trips (hash table)
  const trip = trips ? trips[id] : null; // if there are any projects, find the project with the given data
  const requests = state.firestore.status.requesting;
  const isLoading = requests
    ? Object.values(requests).some((value) => value === true)
    : null;
  return {
    trip: trip,
    profile: state.auth.currProfile,
    auth: state.firebase.auth,
    isLoading: isLoading, // all must be loaded
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'Trips' }])
)(TripDetails);
