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
        {/* First row */}
        <div className="row justify-content-around">
          <div className="col-md-7 row justify-content-between">
            <h1 className="text-secondary tripText align-self-center">
              {trip.title}
            </h1>
            <div className="text-info tripText align-self-center">
              Rs. {trip.price}
            </div>
          </div>
          {/* {Company Card} */}
          <div class="card content-box m-4 change-card-width">
            <div class="card-body">
              <h6 class="card-title change-font font-weight-bold text-uppercase">
                <img
                  src={cardbg}
                  alt=""
                  class="img-fluid logo-on-card rounded-circle mr-1"
                />
                {' ' + trip.companyName}
              </h6>
              <hr></hr>
            </div>
          </div>
        </div>
        {/* Second row */}
        <hr class="col-7 ml-0 divider"></hr>
        <div class="row h-35 align-content-center justify-content-start">
          <h6 className="col-2 ml-3 change-font">
            <i class="fa fa-calendar fa-2x fa-fw" aria-hidden="true"></i>
            {'     ' + trip.departureDate}
          </h6>
          <h6 className="col-2 ml-3 change-font ">
            <i class="fa fa-clock-o fa-2x fa-fw" aria-hidden="true"></i>
            {trip.duration + ' days'}
          </h6>
          <h6 class="col-2 text-uppercase change-font">
            <i class="fa fa-plane fa-2x fa-fw" aria-hidden="true"></i>
            {' ' + trip.departureLoc}
          </h6>
        </div>
        <hr class="col-7 ml-0 divider"></hr>
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
