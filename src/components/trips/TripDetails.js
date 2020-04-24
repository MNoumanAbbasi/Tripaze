import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import FAQSection from './FAQSection';
import { deleteTrip } from '../../store/actions/tripActions';
import cover from '../../Images/coverPhoto.jpg';
import cardbg from './card-bg.png';
import DisplayImage from './DisplayImage';
import { profileType } from '../../Helpers';
// import { Redirect } from 'react-router-dom'

// class container section is material
// class trip-details is from our own css
// taking props to know which trip to load
function TripDetails(props) {
  // TODO: Change to arrow function
  const { trip, isLoading, auth, profile, FAQs } = props; // getting trip category from props

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
      <DisplayImage img={trip.image} page={'details'} />
      <button
        type="button"
        class="btn btn-lg overlay-buttonlg overlay-button form-rounded object-hover"
      >
        EDIT TRIP <i class="fa fas fa-edit fa-fw"></i>
      </button>
      <div className="container align-self-center bg-white frontDrop">
        {/* First row */}
        <div className="row justify-content-around">
          <div className="col-lg-7 row justify-content-between order-lg-1 order-2">
            <h1 className="text-secondary tripText align-self-center">
              {trip.title}
            </h1>
            <div className="text-turq tripText align-self-center">
              Rs. {trip.price}
            </div>
          </div>
          {/* {Company Card} */}
          <div class="card content-box m-4 change-card-width order-lg-2 order-1">
            <div class="card-body">
              <h6 class="card-title change-font font-weight-bold text-uppercase">
                <img
                  src={cardbg}
                  alt=""
                  class="img-fluid logo-on-card rounded-circle mr-1"
                />
                <Link to={'/companyProfile/' + trip.companyId}>
                  {' ' + trip.companyName}
                </Link>
              </h6>
              <hr></hr>
            </div>
          </div>
        </div>
        {/* Second row */}
        <hr class="mt-3 col-7 ml-0 divider"></hr>
        <div class="row align-content-center justify-content-start">
          <h4 className="col-lg-3 change-font ml-0 colored">
            <i class="fa fa-calendar fa-2x fa-fw" aria-hidden="true"></i>
            {'     ' + trip.departureDate}
          </h4>
          <h4 className="col-lg-2 text-uppercase change-font colored">
            <i class="fa fa-clock-o fa-2x fa-fw" aria-hidden="true"></i>
            {trip.duration + ' days'}
          </h4>
          <h4 class="ml-lg-5 col-lg-2 text-uppercase change-font col-offset-7 colored">
            <i class="fa fa-plane fa-2x fa-fw" aria-hidden="true"></i>
            {'' + trip.departureLoc}
          </h4>
        </div>
        <hr class="mb-2 col-7 ml-0 divider"></hr>
        {/* Description Box */}
        <div class="mt-5 row align-content-centre justify-content-between">
          <div class="ml-lg-4 col-lg-6 text-justify text-secondary">
            <h3>Description</h3>
            <div>{trip.description}</div>
            <div>
              <h3 class="mt-5"> Destinations:</h3>
              {trip.destinations.map((dest) => {
                return <li class=" ml-lg-4 text-secondary">{dest}</li>;
              })}
            </div>
          </div>
          <table class="mr-lg-4 mt-3 col-lg-4 table table-border tb-border border-turq object-hover table-md-responsive">
            <thead>
              <tr class="bg-turq">
                <th class="text-white text-center" scope="col">
                  Main Attractions
                </th>
              </tr>
            </thead>
            {/* EDIT BELOW HERE and keep the classes */}
            <tr className="text-center tr-highlight">
              <td>BBQ</td>
            </tr>
            <tr className=" text-center tr-highlight">
              <td>Skiing</td>
            </tr>
            <tr className="text-center tr-highlight">
              <td>Snow</td>
            </tr>
            <tr className="text-center tr-highlight">
              <td>Bonfire</td>
            </tr>
          </table>
        </div>
        <div>
          <h3 class=" ml-lg-4 text-secondary mt-5">
            Frequently Asked Questions:
          </h3>
        </div>
        <FAQSection
          FAQs={FAQs}
          tripID={props.match.params.id}
          profileType={profileType(auth, profile)}
          profileID={auth.uid}
        />
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
  // console.log('trip', state);
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
    FAQs: state.firestore.ordered.FAQs,
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
  firestoreConnect((props) => [
    { collection: 'Trips', doc: props.match.params.id },
    { collection: 'FAQs', where: [['tripID', '==', props.match.params.id]] },
  ])
)(TripDetails);
