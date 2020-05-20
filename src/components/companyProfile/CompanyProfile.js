import React, { useState } from 'react';
import TripsList from '../trips/TripsList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'; // higher order
import ReviewSection from './ReviewSection';
import { profileType } from '../../Helpers';
import LoadingBox from './../dashboard/LoadingBox';
import CoverImage from '../displayImages/CoverImage';
import RatingBar from './RatingBar.js';
import ReviewStats from './ReviewStats';
import LogoImage from '../displayImages/LogoImage';

const CompanyProfile = (props) => {
  const {
    trips,
    company,
    profile,
    isLoading,
    reviews,
    auth,
    avgRating,
    wrongID,
  } = props;

  if (wrongID) props.history.push('/'); // If wrong id entered in the url, redirect to homepage
  const adminMode = auth.uid === props.match.params.id; // Is this page being viewed by a logged in company?

  const [reviewModalShow, setReviewModalShow] = useState(false);

  // if data has completely been fetched from Firestore, display the company profile
  const isInitialized = !isLoading && trips && company && auth && reviews;
  if (isInitialized) {
    // Messages showing that no reviews or trips are there for display
    const noTrips =
      trips.length !== 0 ? null : (
        <p className="text-center text-secondary">
          No Trips have been added yet
        </p>
      );
    const noReviews =
      reviews.length !== 0 ? null : (
        <p className="text-center text-secondary">
          No Reviews have been added yet
        </p>
      );

    const currProfileType = profileType(auth, profile);
    return (
      <div className="row m-0 justify-content-center">
        {/* Review statistics opens when the rating is clicked */}
        <ReviewStats
          show={reviewModalShow}
          onHide={() => setReviewModalShow(false)}
          reviews={reviews}
          avgRating={avgRating}
        />

        {/* Show company cover photo */}
        <CoverImage img={company.coverImage} type="companyCover" />

        {/* Company logo and edit profile button */}
        <div className="container thirdDrop">
          <div className="row justify-content-lg-between justify-content-sm-start mb-3">
            {/* If we are in admin mode, display edit profile button */}
            <div>
              {adminMode && (
                <button
                  type="button"
                  class="btn mt-lg-4 mt-3 ml-5 btn-lg green-button form-rounded border-turq"
                  onClick={() =>
                    props.history.push('/editprofile/' + props.match.params.id)
                  }
                >
                  EDIT PROFILE <i class="fa fas fa-edit fa-fw"></i>
                </button>
              )}
            </div>

            {/* Show company logo */}
            <div className="logo-forward responsive bigscreen mr-1">
              <LogoImage
                companyID={props.match.params.id}
                className="img-fluid logo-on-profile rounded-circle mr-5"
              />
            </div>
          </div>
        </div>

        {/* Company details */}
        <div className="container align-self-start bg-white frontDrop">
          {/* FIRST SECTION (Company Details) */}
          <div className="row justify-content-between align-content-center">
            {/* Heading */}
            <div className="ml-lg-4 col-lg-7 text-secondary">
              <h1 className="mt-5 tripText justify-content-end" data-cy="company-name">
                {/*logo for small screens */}
                <LogoImage
                  companyID={props.match.params.id}
                  className="img-fluid logo-on-profile2 rounded-circle mr-4 smallscreen"
                />
                {company.companyName}
              </h1>
            </div>

            {/* Company Description */}
            <div className=" row ml-lg-4 col-lg-7 text-secondary">
              <hr class="mt-2 col-12 ml-0 divider2"></hr>
              <h3 className="mt-5 col-12 text-secondary">Description</h3>
              <p
                className="new-line text-justify ml-3"
                style={{ whiteSpace: 'pre-line' }}
              >
                {company.description}
              </p>
            </div>

            {/* Company Card with rating */}
            <div class="mr-5 change-card-width">
              <div class="card-body">
                <div
                  className="row mt-5 mb-5 hasOnClick"
                  onClick={() => setReviewModalShow(true)}
                  data-cy="rating-bar"
                >
                  <RatingBar
                    name="companyrating"
                    value={avgRating}
                    className="ml-2"
                    editing={true}
                  />
                  <h6 className="ml-4">
                    {' '}
                    {reviews.length === 1
                      ? reviews.length + ' Review'
                      : reviews.length + ' Reviews'}
                  </h6>
                </div>
                <h6 class="card-title change-font font-weight-bold text-uppercase colored mt-5" data-cy="conta">
                  <i class="fa fa-phone fa-2x fa-fw" aria-hidden="true"></i>
                  {company.contact}
                </h6>
                <h6 class="card-title change-font font-weight-bold text-uppercase colored mt-5 mb-3">
                  <i
                    class="fa fa-map-marker fa-2x fa-fw"
                    aria-hidden="true"
                  ></i>
                  {company.location}
                </h6>
              </div>
            </div>
          </div>

          {/* Second Section (Upcoming trips)*/}
          <div className="row p-4 mt-5 justify-content-center align-content-centre text-turq">
            <i class="fa fa-th fa-3x fa-fw" aria-hidden="false"></i>
            <h3 className="tripText"> Upcoming Trips</h3>
          </div>
          {/* ONLY SHOW IF NO TRIPS */}
          {noTrips}
          {/* ------------- */}
          <div className="container mt-4">
            <TripsList trips={trips} isCompProfile={adminMode} />
          </div>

          {/* Third Section (Company Reviews) */}
          <div className="row p-4 mt-5 justify-content-center align-content-centre text-turq">
            <i class="fa fa-th fa-3x fa-fw" aria-hidden="false"></i>
            <h3 className="tripText"> Company Reviews</h3>
          </div>
          {/* ONLY SHOW IF NO Reviews */}
          {noReviews}
          {/* ------------- */}
          <ReviewSection
            companyID={props.match.params.id}
            reviews={reviews}
            profileType={currProfileType}
            id={auth.uid}
          />
        </div>
      </div>
    );
  } else {
    return <LoadingBox />;
  }
};

// Map state from store to props in component
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const companies = state.firestore.data.Companies;
  const company = companies ? companies[id] : null;
  let wrongID = false;

  // Checking if any of the requess are being fetched
  const requests = state.firestore.status.requesting;
  const isLoading = state.firestore.status.requesting
    ? Object.values(requests).some((value) => value === true)
    : null;

  // Checking if a wrong id has been entered in the trip details page (i.e. all requests are pending)
  const requested = state.firestore.status.requested;
  const initiatedRequests = requested
    ? Object.values(requested).every((value) => value === true)
    : null;
  if (companies && initiatedRequests && companies[id] == null) {
    wrongID = true;
  }

  // To get the rating bar and calculate average rating
  const reviews = state.firestore.ordered.Reviews;
  let avgRating = 0;
  if (reviews && reviews.length > 0) {
    let sum = 0;
    reviews.forEach((review) => {
      sum += review.rating;
    });
    avgRating = sum / reviews.length;
  }

  return {
    trips: state.firestore.ordered.Trips,
    company: company,
    auth: state.firebase.auth,
    profile: state.auth.currProfile,
    isLoading: isLoading, // all must be loaded
    reviews: reviews,
    avgRating: avgRating,
    wrongID: wrongID,
  };
};

// Connecting redux store with Dashboard component
export default compose(
  connect(mapStateToProps),

  // An abstraction for the usage of redux with firebase. Loads the data from firestore in realtime
  firestoreConnect((props) => [
    { collection: 'Companies', doc: props.match.params.id },
    {
      collection: 'Trips',
      where: [
        ['companyId', '==', props.match.params.id], // trips by the company in question
      ],
      orderBy: ['departureDate'],
    },
    {
      collection: 'Reviews',
      where: [['companyID', '==', props.match.params.id]],
      orderBy: ['timestamp', 'asc'],
    },
  ])
)(CompanyProfile);
