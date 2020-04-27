import React, { Component } from 'react';
import TripsList from '../trips/TripsList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'; // higher order
import { Redirect } from 'react-router-dom';
import { profileType } from '../../Helpers';
import logo_wt from '../../Images/logo-without-text.jpg';
import background from '../../Images/HomepageImage.jpg';
import SearchBar from '../layout/SearchBar';
import { searchBarShow } from '../../store/actions/filterActions';
import LoadingBox from './LoadingBox';

let lastScrollY = 0;

// 6 columns on medium and 12 column on small screens
class Dashboard extends Component {
  // To detect scroll
  componentDidMount() {
    // Add search bar to navbar if in mobile mode
    if (window.innerWidth < 992) this.props.searchBarShow(true);
    else this.props.searchBarShow(false);
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
    this.props.searchBarShow(true);
  }

  handleScroll = () => {
    lastScrollY = window.scrollY;
    // If search bar not showing but should be shown
    if (window.innerWidth < 992 && !this.props.searchBarVisible) {
      this.props.searchBarShow(true);
    } else if (lastScrollY > 252 && !this.props.searchBarVisible) {
      this.props.searchBarShow(true);
    }
    // Else if search bar is showing but should not be shown
    else if (
      lastScrollY <= 252 &&
      this.props.searchBarVisible &&
      window.innerWidth >= 992
    ) {
      this.props.searchBarShow(false);
    }
  };

  render() {
    const { trips, profile, auth, isLoading } = this.props;
    const isInitialized = trips && !isLoading;

    // If company is logged in, redirect to company profile
    if (profileType(auth, profile) === 'Company') {
      return <Redirect to={'/companyprofile/' + auth.uid} />;
    }

    if (isInitialized) {
      return (
        <div className="homePage">
          <div class="d-sm-block d-none">
            <img
              alt="Background"
              src={background}
              className="img-fluid mw-100"
            ></img>
            <SearchBar
              formClass="input-group form-group home-searchbar w-50 centered"
              inputClass="form-control form-control-lg form-rounded"
              centreSearchBar={true}
            />
            <a href="#tripcards" className="scroll-button ">
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div id="tripcards">
            <hr className="greenline mw-100"></hr>

            <div className="row justify-content-center justify-content-around align-items-end">
              <h3 className="home-heading mt-5">ALL TRIPS</h3>
              <img
                src={logo_wt}
                className="logo-no-text logo-dims ml-3"
                alt="Logo"
              ></img>
            </div>
            <div className="container">
              <TripsList trips={trips} />
            </div>
          </div>
        </div>
      );
    } else {
      return <LoadingBox />;
    }
  }
}
// Map state from store to props in component
const mapStateToProps = (state) => {
  const requests = state.firestore.status.requesting;
  const isLoading = requests
    ? Object.values(requests).some((value) => value === true)
    : null;
  return {
    trips: state.firestore.ordered.Trips,
    auth: state.firebase.auth,
    profile: state.auth.currProfile,
    isLoading: isLoading,
    searchBarVisible: state.filters.showSearch,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // so when we call props.createTrip, it's gonna perform a dispatch using the asynch middleware createTrip in src/store/actions
    searchBarShow: (show) => dispatch(searchBarShow(show)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  // tells us which collections to connect to in our firebase project whenever this component, namely dashboard, is active
  // Whenever collection trip is changed, it would call the firestore reducer which would update the state of this firestore
  firestoreConnect([{ collection: 'Trips' }])
)(Dashboard);
