import React, { useState } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import FAQSection from './FAQSection';
import { deleteTrip, readNotification } from '../../store/actions/tripActions';
import CoverImage from '../displayImages/CoverImage';
import LogoImage from '../displayImages/LogoImage';
import { profileType } from '../../Helpers';
import LoadingBox from './../dashboard/LoadingBox';
import moment from 'moment';
import MapContainer from './MapContainer';
import RatingBar from '../companyProfile/RatingBar.js';
import { deleteModal } from '../modals/TripModals';

const TripDetails = (props) => {
  const {
    trip,
    isLoading,
    auth,
    profile,
    FAQs,
    avgRating,
    reviewLength,
  } = props; // getting trip category from props
  console.log(reviewLength);
  const isInitialized = !isLoading && trip && FAQs && reviewLength != null;

  const [modalShow, setModalShow] = useState(false);

  if (!isInitialized) {
    return <LoadingBox />;
  }
  let deleteButton = null;
  let editButton = null;
  const adminMode = auth.uid === trip.companyId;
  // Route guarding
  if (profile && profileType(auth, profile) === 'Company' && !adminMode)
    props.history.push('/');
  if (adminMode) {
    props.readNotification(props.match.params.id); // read the notification
    editButton = (
      <button
        type="button"
        class="btn mr-4 btn-lg green-button form-rounded border-turq mt-4"
        onClick={() => props.history.push('/edittrip/' + props.match.params.id)}
      >
        EDIT TRIP <i class="fa fas fa-edit fa-fw"></i>
      </button>
    );
    deleteButton = (
      <button
        type="button"
        class="btn btn-lg red-button form-rounded border-red mt-4"
        onClick={() => deleteModal(props, trip.img)}
        // onClick={() => setModalShow(true)}
      >
        DELETE <i class="fa fas fa-trash fa-fw"></i>
      </button>
    );
  }
  const noQuestions =
    FAQs.length != 0 ? null : (
      <p className="text-center text-secondary">
        No Questions have been posted yet
      </p>
    );
  return (
    <div className="row m-0 tripDetails justify-content-center">
      <CoverImage img={trip.image} type="trip" />
      <div className="container thirdDrop">
        <div className="row justify-content-lg-start justify-content-sm-around">
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
              {/* The code separationg for thousands is taken from: https://answers.acrobatusers.com/How-to-separate-thousands-with-space-and-adding-2-decimal-places-q282162.aspx */}
              Rs. {trip.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
          </div>
          {/* {Company Card} */}
          <div class="card content-box m-4 mt-lg-5 change-card-width order-lg-2 order-1">
            <div class="card-body">
              <h6 class="card-title change-font font-weight-bold text-uppercase">
                <LogoImage
                  companyID={trip.companyId}
                  className="img-fluid logo-on-card rounded-circle mr-1"
                />
                <Link to={'/companyProfile/' + trip.companyId}>
                  {' ' + trip.companyName}
                </Link>
              </h6>
              <div className="row justify-content-around">
                <RatingBar
                  name="companyrating"
                  value={avgRating}
                  className="ml-lg-4"
                />
                <p>{reviewLength} Reviews</p>
              </div>
            </div>
          </div>
        </div>
        {/* Second row */}
        <hr class="mt-3 col-7 ml-0 divider"></hr>
        <div class="row align-content-center justify-content-start">
          <h4 className="col-lg-3 change-font ml-0 colored">
            <i class="fa fa-calendar fa-lg fa-fw" aria-hidden="true"></i>
            {'     ' +
              moment(trip.departureDate.toDate()).format('MMM Do YYYY')}
          </h4>
          <h4 className="col-lg-2 text-uppercase change-font colored">
            <i class="fa fa-clock-o fa-lg fa-fw" aria-hidden="true"></i>
            {trip.duration + ' days'}
          </h4>
          <h4 class="ml-lg-4 col-lg-3 text-uppercase change-font col-offset-7 colored">
            <i class="fa fa-bus fa-lg fa-fw" aria-hidden="true"></i>
            {'  ' + trip.departureLoc}
          </h4>
        </div>
        <hr class="mb-2 col-7 ml-0 divider"></hr>
        {/* Description Box */}
        <div class="mt-5 row align-content-centre justify-content-between">
          <div class="ml-lg-4 col-lg-6 text-justify text-secondary">
            <h3 className="text-secondary">Description</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{trip.description}</p>
            <div>
              <h3 class="mt-5 text-secondary"> Destinations:</h3>
              {trip.destinations.map((dest) => {
                return (
                  <li key={dest} class=" ml-lg-4 text-secondary">
                    {dest}
                  </li>
                );
              })}
            </div>
          </div>
          <table class="mr-lg-4 mt-lg-1 mt-4 col-lg-4 table table-border tb-border border-turq table-md-responsive">
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

        <div className="row p-4 mt-5 justify-content-center align-content-centre text-turq">
          <i class="fa fa-map-marker fa-3x fa-fw" aria-hidden="false"></i>
          <h3 className="tripText"> Map</h3>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <MapContainer destinations={trip.destinations} />
        </div>
        <div className="row p-4 mt-5 justify-content-center align-content-centre text-turq bigscreen">
          <i class="fa fa-question-circle fa-3x fa-fw" aria-hidden="false"></i>
          <h3 className="tripText">Frequently Asked Questions</h3>
        </div>
        <div className="row p-4 mt-5 justify-content-center align-content-centre text-turq smallscreen">
          <i class="fa fa-question-circle fa-3x fa-fw" aria-hidden="false"></i>
          <h3 className="tripText">FAQ</h3>
        </div>
        {/* ONLY SHOW IF NO QUESTIONS */}
        {noQuestions}
        {/* ------------- */}
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

  // getting number of reviews and average rating
  const reviews = state.firestore.ordered.Reviews;
  let avgRating = 0;
  let reviewLength = null;
  if (reviews) {
    let sum = 0;
    reviews.forEach((review) => {
      sum += review.rating;
    });
    reviewLength = reviews.length;
    avgRating = sum / reviewLength;
  }
  return {
    trip: trip,
    profile: state.auth.currProfile,
    auth: state.firebase.auth,
    isLoading: isLoading, // all must be loaded
    FAQs: state.firestore.ordered.FAQs,
    avgRating: avgRating,
    reviewLength: reviewLength,
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
  firestoreConnect((props) => {
    let query = [
      { collection: 'Trips', doc: props.match.params.id },
      {
        collection: 'FAQs',
        where: [['tripID', '==', props.match.params.id]],
        orderBy: ['timestamp', 'asc'],
      },
    ];
    if (props.trip)
      query.push({
        collection: 'Reviews',
        where: [['companyID', '==', props.trip.companyId]],
      });

    return query;
  })
)(TripDetails);
