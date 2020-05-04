import React, { useState } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import FAQSection from './FAQSection';
import { deleteTrip, readNotification } from '../../store/actions/tripActions';
import cardbg from './card-bg.png';
import CoverImage from '../displayImages/CoverImage';
import LogoImage from '../displayImages/LogoImage';
import { profileType } from '../../Helpers';
import Confirmation from '../dialogBoxes/Confirmation';
import LoadingBox from './../dashboard/LoadingBox';
import moment from 'moment';
import MapContainer from './MapContainer';

// class container section is material
// class trip-details is from our own css
// taking props to know which trip to load
const TripDetails = (props) => {
  const { trip, isLoading, auth, profile, FAQs } = props; // getting trip category from props

  const isInitialized = !isLoading && trip && FAQs;

  const [modalShow, setModalShow] = useState(false);

  // wrong id entered
  if (!isLoading && !trip && auth) props.history.push('/');

  if (!isInitialized) {
    return <LoadingBox />;
  }

  let deleteButton = null;
  let editButton = null;
  const adminMode = auth.uid === trip.companyId;
  if (adminMode) {
    props.readNotification(props.match.params.id); // read the notification
    editButton = (
      <button
        type="button"
        class="btn mr-5 btn-lg green-button form-rounded"
        onClick={() => props.history.push('/edittrip/' + props.match.params.id)}
      >
        EDIT TRIP <i class="fa fas fa-edit fa-fw"></i>
      </button>
    );
    deleteButton = (
      <button
        type="button"
        class="btn btn-lg mr-1 red-button form-rounded"
        onClick={() => setModalShow(true)}
      >
        DELETE <i class="fa fas fa-trash fa-fw"></i>
      </button>
    );
  }

  return (
    <div className="row m-0 tripDetails justify-content-center">
      <Confirmation
        show={modalShow}
        onHide={() => setModalShow(false)}
        onDelete={() => {
          props.deleteTrip(trip.image, props.match.params.id);
          props.history.push('/');
        }}
      />
      <CoverImage img={trip.image} type="trip" />
      <div className="container thirdDrop">
        <div className="row justify-content-lg-end justify-content-sm-around">
          {editButton}
          {deleteButton}
        </div>
      </div>
      <div className="container bg-white frontDrop">
        {/* First row */}
        <div className="row justify-content-around">
          <div className="col-lg-7 row justify-content-between order-lg-1 order-2">
            <h1 className="text-secondary tripText align-self-center mt-2">
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
                <LogoImage companyID={trip.companyId} />
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
            {'     ' +
              moment(trip.departureDate.toDate()).format('MMM Do YYYY')}
          </h4>
          <h4 className="col-lg-2 text-uppercase change-font colored">
            <i class="fa fa-clock-o fa-2x fa-fw" aria-hidden="true"></i>
            {trip.duration + ' days'}
          </h4>
          <h4 class="ml-lg-4 col-lg-3 text-uppercase change-font col-offset-7 colored">
            <i class="fa fa-bus fa-2x fa-fw" aria-hidden="true"></i>
            {'  ' + trip.departureLoc}
          </h4>
        </div>
        <hr class="mb-2 col-7 ml-0 divider"></hr>
        {/* Description Box */}
        <div class="mt-5 row align-content-centre justify-content-between">
          <div class="ml-lg-4 col-lg-6 text-justify text-secondary">
            <h3>Description</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{trip.description}</p>
            <div>
              <h3 class="mt-5"> Destinations:</h3>
              {trip.destinations.map((dest) => {
                return (
                  <li key={dest} class=" ml-lg-4 text-secondary">
                    {dest}
                  </li>
                );
              })}
            </div>
          </div>
          <table class="mr-lg-4 mt-3 col-lg-4 table table-border tb-border border-turq table-md-responsive">
            <thead>
              <tr class="bg-turq">
                <th class="text-white text-center" scope="col">
                  Main Attractions
                </th>
              </tr>
            </thead>
            <tbody>
              {trip.attractions.map((attraction, index) => {
                return (
                  <tr key={index} className="text-center">
                    <td>{attraction}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-center mt-5">
          <MapContainer destinations={trip.destinations} />
        </div>
        <div className="row p-4 mt-5 justify-content-center align-content-centre text-turq">
          <i class="fa fa-question-circle fa-3x fa-fw" aria-hidden="false"></i>
          <h3 className="tripText">Frequently Asked Questions</h3>
        </div>
        <FAQSection
          FAQs={FAQs}
          tripID={props.match.params.id}
          profileType={profileType(auth, profile)}
          profileID={auth.uid}
        />
      </div>
    </div>
  );
};

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
    deleteTrip: (tripName, tripID) => dispatch(deleteTrip(tripName, tripID)),
    readNotification: (tripID) => dispatch(readNotification(tripID)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [
    { collection: 'Trips', doc: props.match.params.id },
    { collection: 'FAQs', where: [['tripID', '==', props.match.params.id]] },
  ])
)(TripDetails);
