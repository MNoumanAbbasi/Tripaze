import React, { Component } from 'react';
import TripsList from '../trips/TripsList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'; // higher order
import { Redirect } from 'react-router-dom';
import { profileType } from '../../Helpers';
import logo_wt from '../../Images/logo-without-text.jpg';
import background from '../../Images/bg.gif';
import SearchBar from '../layout/SearchBar';
import { searchBarShow } from '../../store/actions/filterActions';
import LoadingBox from './LoadingBox';
import FilterBar from '../filterBar/FilterBar';

let lastScrollY = 0; // get scroll position
const today = new Date(); // get today's date to only load upcoming trips

// Constants necessary to implement search bar toggle
const DESKTOP_WIDTH = 992;
const SCROLL_TOGGLE_LOCATION = 295;

class Dashboard extends Component {
  // To detect scroll
  componentDidMount() {
    // Add search bar to navbar if in mobile mode
    if (window.innerWidth < DESKTOP_WIDTH) this.props.searchBarShow(true);
    else this.props.searchBarShow(false);
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
    this.props.searchBarShow(true);
  }

  handleScroll = () => {
    lastScrollY = window.scrollY;
    // If in mobile mode, search bar should be shown (if it is not visible already)
    if (window.innerWidth < DESKTOP_WIDTH && !this.props.searchBarVisible) {
      this.props.searchBarShow(true);
    }
    // If search bar not showing on a desktop but should be shown
    else if (
      lastScrollY > SCROLL_TOGGLE_LOCATION &&
      !this.props.searchBarVisible
    ) {
      this.props.searchBarShow(true);
    }
    // If search bar is showing on a desktop but should not be shown
    else if (
      lastScrollY <= SCROLL_TOGGLE_LOCATION &&
      this.props.searchBarVisible &&
      window.innerWidth >= DESKTOP_WIDTH
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

    // if data has been fetched from Firestore, display the homepage
    if (isInitialized) {
      return (
        <div className="homePage">
          <div class="d-block">
            {/* Homepage background */}
            <img
              alt="Background"
              src={background}
              className="img-fluid mw-100 w-100 d-md-block d-none"
            ></img>
            <div className="d-md-block d-none">
              {/* Homepage searchbar */}
              <SearchBar
                formClass="input-group form-group home-searchbar searchbar-w centered"
                inputClass="form-control form-control-lg form-rounded"
                centreSearchBar={true}
              />
            </div>
            {/* Advanced search (filterbar) option on desktops */}
            <a
              class="btn dark-button btn-secondary filter-button d-md-block d-none"
              href="#advancedSearch"
            >
              Advanced Search
            </a>
            <FilterBar trips={trips} />

            {/* Scroll button */}
            <a href="#tripcards" className="scroll-button d-md-block d-none">
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>

          {/* Headings for trip cards display */}
          <div id="tripcards">
            <hr className="greenline mw-100 d-md-block d-none"></hr>
            <div className="row justify-content-center justify-content-around mt-5 align-items-end">
              <h3 className="home-heading mt-5">ALL TRIPS</h3>
              <img
                src={logo_wt}
                className="logo-no-text logo-dims ml-3 mb-3"
                alt="Logo"
              ></img>
            </div>

            {/* Advanced search option on mobile */}
            <div className="d-flex justify-content-center">
              <a
                class="btn dark-button btn-secondary mob-shadow d-md-none d-xs-block change-font"
                href="#advancedSearch"
              >
                Advanced Search
              </a>
            </div>

            {/* Display trip cards */}
            <div className="container">
              <TripsList trips={trips} isCompProfile={false} />
            </div>
          </div>
        </div>
      );
    }
    // Else if data has not been fetched yet, show loading screen
    else {
      return <LoadingBox />;
    }
  }
}

// Importing state from redux store
const mapStateToProps = (state) => {
  const requests = state.firestore.status.requesting;
  // Checking if any of the requess are being fetched
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

// Importing actions from redux store
const mapDispatchToProps = (dispatch) => {
  return {
    searchBarShow: (show) => dispatch(searchBarShow(show)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  // An abstraction for the usage of redux with firebase. Loads the data from firestore in realtime
  firestoreConnect(() => {
    return [
      {
        collection: 'Trips',
        where: [['departureDate', '>=', today]], // only show upcoming trips
        orderBy: ['departureDate'], // order by departure date
      },
    ];
  })
)(Dashboard);
