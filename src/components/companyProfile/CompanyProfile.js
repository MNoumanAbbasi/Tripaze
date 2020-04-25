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
            {/* First Row */}
            <div className="row justify-content-around">
              <h1 className="ml-4 text-secondary tripText align-self-center">
                THE BEST TRAVEL AGENCY
              </h1>
              {/* {Company Card} */}
              <div class="card content-box m-4 change-card-width order-lg-2 order-1">
                <div class="card-body">
                  <h6 class="card-title change-font font-weight-bold text-uppercase text-secondary">
                    <img
                      src={cardbg}
                      alt=""
                      class="img-fluid logo-on-card rounded-circle mr-1"
                    />
                    Address of company
                  </h6>
                  <hr></hr>
                </div>
              </div>
            </div>
            <h1 className="ml-4 text-secondary tripText align-self-center">
              THE BEST TRAVEL AGENCY
            </h1>
            <hr class="col-7 ml-0 divider"></hr>
            {/* Description Box */}
            <div class="mt-5 row align-content-centre justify-content-between">
              <div class="col-lg-6">
                <h3 class="text-secondary">Description</h3>
                <div class="text-secondary ">
                  Description will be inserted here
                </div>
              </div>
            </div>
          </div>

          <div className="container cardslist-margin">
            <TripsList trips={trips} />
          </div>
          <ReviewSection
            companyID={this.props.match.params.id}
            reviews={reviews}
            profileType={currProfileType}
            id={auth.uid}
          />
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
