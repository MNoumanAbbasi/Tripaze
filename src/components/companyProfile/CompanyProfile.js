import React, { Component } from 'react';
import TripsList from '../trips/TripsList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'; // higher order
import ReviewSection from './ReviewSection';
import defaultCover from '../../Images/coverPhoto.jpg';
import { profileType } from '../../Helpers';
import cardbg from '../trips/card-bg.png';
import { Link } from 'react-router-dom';

// 6 columns on medium and 12 column on small screens
class CompanyProfile extends Component {
  render() {
    const { trips, company, profile, isLoading, reviews, auth } = this.props;
    const isInitialized = !isLoading && trips && company && auth;
    if (isInitialized) {
      const currProfileType = profileType(auth, profile);
      return (
        <div className="row m-0">
          <img src={defaultCover} className="w-100 backDrop"></img>
          <div className="container align-self-center bg-white frontDrop">
            {/* First section */}
            <div className="row justify-content-between align-content-center">
              <div className="ml-lg-4 col-lg-7 text-secondary">
                <h1 className="mt-5 text-secondary tripText">
                  THE BEST TRAVEL AGENCY
                </h1>
                <hr class="mt-3 col-12 ml-0 divider"></hr>
                <h3 className="mt-5 text-justify text-secondary">
                  Description
                </h3>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </div>
              </div>
              {/* {Company Card} */}
              <div class="card content-box mt-5 mr-5 change-card-width order-lg-2 order-1">
                <div class="card-body">
                  <h6 class="card-title change-font font-weight-bold text-uppercase text-secondary">
                    <i
                      class="fa fa-map-marker fa-2x fa-fw"
                      aria-hidden="true"
                    ></i>
                    Address of Company
                  </h6>
                  <hr></hr>
                  <h6 class="card-title change-font font-weight-bold text-uppercase text-secondary">
                    <i class="fa fa-phone fa-2x fa-fw" aria-hidden="true"></i>
                    Phone Number
                  </h6>
                  <hr></hr>
                  <h6>This is where the Rating bar will be</h6>
                </div>
              </div>
            </div>
            {/* Second Section */}
            <div className="row p-4 mt-5 justify-content-center align-content-centre">
              <i class="fa fa-layer-group fa-2x fa-fw" aria-hidden="true"></i>
              <h3 className="text-secondary col-4">UPCOMING TRIPS</h3>
            </div>
          </div>

          {/* Second Section */}

          {/* 
          <div className="container cardslist-margin">
            <TripsList trips={trips} />
          </div>
          <ReviewSection
            companyID={this.props.match.params.id}
            reviews={reviews}
            profileType={currProfileType}
            id={auth.uid}
          /> */}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

// Map state from store to props in component
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const companies = state.firestore.data.Companies; // using data instead of ordered here since we are interested in referencing specific trips (hash table)
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
