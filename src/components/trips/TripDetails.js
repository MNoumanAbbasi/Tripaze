import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import FAQSection from './FAQSection';
import { deleteTrip } from '../../store/actions/tripActions';
import cover from '../../Images/coverPhoto.jpg';
import cardbg from './card-bg.png';
// import { Redirect } from 'react-router-dom'

// class container section is material
// class trip-details is from our own css
// taking props to know which trip to load
function TripDetails(props) {
  const { trip, isLoading, auth } = props; // getting trip category from props
  const isInitialized = !isLoading && trip;

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

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
    deleteButton = (
      <button
        onClick={() => {
          props.deleteTrip(props.match.params.id);
          props.history.push('/');
        }}
      >
        Delete Trip
      </button>
    );
  }
  return (
    <div className="row m-0 tripDetails">
      <img src={cover} className="w-100"></img>
      <div className="container z-depth-1">
        <div className="list-inline d-flex  justify-content-around">
          <h1 className=" list-inline-item text-capitalize text-secondary tripText">
            {trip.title}
          </h1>
          <div className=" list-inline-item text-info tripText">
            Rs. {trip.price}
          </div>
          <div class="list-inline-item text-secondary tripText">
            <img
              src={cardbg}
              alt=""
              class="img-fluid list-inline-item logo-on-card rounded-circle mr-1"
            />
            <div class="list-inline-item">
              {' '}
              <Link to={'/companyProfile/' + trip.companyId}>
                {' ' + trip.companyName}
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container section trip-details">
        <div className="card z-depth-2 top">
          <div className="card-content">
            <span className="card-title">{trip.title}</span>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Cost: Rs. {trip.price}</div>

            <div>On: {trip.departureDate}</div>
            <div>Frommo: {trip.departureLoc}</div>
            <div>Description: {trip.description}</div>
            <div>Attractions: {trip.attraction}</div>
            <div>Destinations:</div>
            {trip.destinations.map((dest) => {
              return <li>{dest}</li>;
            })}

            <div>
              {' '}
              Company:
              <Link to={'/companyProfile/' + trip.companyId}>
                {' ' + trip.companyName}
              </Link>
            </div>
          </div>
          <FAQSection />
          {editButton}
          {deleteButton}
        </div>
      </div>{' '} */}
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

const mapDispatchToProps = (dispatch) => {
  return {
    // so when we call props.createTrip, it's gonna perform a dispatch using the asynch middleware createTrip in src/store/actions
    deleteTrip: (tripID) => dispatch(deleteTrip(tripID)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'Trips' }])
)(TripDetails);
