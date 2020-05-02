import React from 'react';
import TripsList from '../trips/TripsList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'; // higher order
import ReviewSection from './ReviewSection';
import { profileType } from '../../Helpers';
import LoadingBox from './../dashboard/LoadingBox';
import CoverImage from '../displayImages/CoverImage';

// 6 columns on medium and 12 column on small screens
const CompanyProfile = (props) => {
  const { trips, company, profile, isLoading, reviews, auth } = props;
  const isInitialized = !isLoading && trips && company && auth;
  const adminMode = auth.uid === props.match.params.id;
  if (isInitialized) {
    const currProfileType = profileType(auth, profile);
    return (
      <div className="row m-0 justify-content-center">
        <CoverImage img={company.coverImage} type="companyCover" />
        {/* Logo Image for Overlapping
          <div className="overlay row w-100 justify-content-lg-end justify-content-center">
          <img
          class="border-turq tb-border"
          alt="100x100"
          src={defaultLogo}
          data-holder-rendered="true"
          />
        </div> */}
        {/* <LogoImage img={company.logoImage} type="companyLogo" /> */}
        <div className="container thirdDrop">
          <div className="row justify-content-lg-end justify-content-sm-around">
            {adminMode && (
              <button
                type="button"
                class="btn mt-lg-5 mr-5 btn-lg green-button form-rounded"
                onClick={() =>
                  props.history.push('/editprofile/' + props.match.params.id)
                }
              >
                EDIT PROFILE <i class="fa fas fa-edit fa-fw"></i>
              </button>
            )}
          </div>
        </div>
        <div className="container align-self-start bg-white frontDrop">
          {/* First section */}
          <div className="row justify-content-between align-content-center">
            {/* Heading */}
            <div className="ml-lg-4 col-lg-7 text-secondary">
              <h1 className="mt-5 tripText">{company.companyName}</h1>
            </div>
            {/* Description + Card */}
            <div className=" row ml-lg-4 col-lg-7 text-secondary">
              <hr class="mt-2 col-12 ml-0 divider"></hr>
              <h3 className="mt-5 col-12 text-secondary">Description</h3>
              <div className="text-justify ml-3">{company.description}</div>
            </div>
            {/* {Company Card } */}
            <div class="card content-box mr-5 change-card-width">
              <div class="card-body">
                <h6 class="card-title change-font font-weight-bold text-uppercase colored">
                  <i
                    class="fa fa-map-marker fa-2x fa-fw"
                    aria-hidden="true"
                  ></i>
                  {company.location}
                </h6>
                <hr></hr>
                <h6 class="card-title change-font font-weight-bold text-uppercase colored">
                  <i class="fa fa-phone fa-2x fa-fw" aria-hidden="true"></i>
                  {company.contact}
                </h6>
                <hr></hr>
                <h6>This is where the Rating bar will be</h6>
              </div>
            </div>
          </div>

          {/* Second Section */}
          <div className="row p-4 mt-5 justify-content-center align-content-centre text-turq">
            <i class="fa fa-th fa-3x fa-fw" aria-hidden="false"></i>
            <h3 className="tripText">Upcoming Trips</h3>
          </div>
          <div className="container mt-4">
            <TripsList trips={trips} />
          </div>

          {/* Third Section */}
          <div className="row p-4 mt-5 justify-content-center align-content-centre text-turq">
            <i class="fa fa-th fa-3x fa-fw" aria-hidden="false"></i>
            <h3 className="tripText">Company Reviews</h3>
          </div>
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
  const requests = state.firestore.status.requesting;
  const isLoading = requests
    ? Object.values(requests).some((value) => value === true)
    : null;
  return {
    trips: state.firestore.ordered.Trips,
    company: company,
    auth: state.firebase.auth,
    profile: state.auth.currProfile,
    isLoading: isLoading, // all must be loaded
    reviews: state.firestore.ordered.Reviews,
  };
};

export default compose(
  connect(mapStateToProps),
  // tells us which collections to connect to in our firebase project whenever this component, namely dashboard, is active
  // Whenever collection trip is changed, it would call the firestore reducer which would update the state of this firestore
  firestoreConnect((props) => [
    {
      collection: 'Trips',
      where: [['companyId', '==', props.match.params.id]],
    },
    { collection: 'Companies', doc: props.match.params.id },
    {
      collection: 'Reviews',
      where: [['companyID', '==', props.match.params.id]],
    },
  ])
)(CompanyProfile);
