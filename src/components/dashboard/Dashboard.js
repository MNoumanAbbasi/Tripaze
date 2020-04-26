import React, { Component } from 'react';
import TripsList from '../trips/TripsList';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase'; // higher order
import { Redirect } from 'react-router-dom';
import { profileType } from '../../Helpers';
import logo_wt from '../../Images/logo-without-text.jpg';
import background from '../../Images/HomepageImage.jpg';
import SearchBar from '../layout/SearchBar';
import { searchBarShow } from '../../store/actions/filterActions';

let lastScrollY = 0;
let ticking = false;

// 6 columns on medium and 12 column on small screens
class Dashboard extends Component {
  // To detect scroll
  componentDidMount() {
    this.props.searchBarShow(false);
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    console.log('ASD');
    window.removeEventListener('scroll', this.handleScroll, false);
    this.props.searchBarShow(true);
  }
  tripsPart = React.createRef();
  handleScroll = () => {
    lastScrollY = window.scrollY;
    // If search bar not showing but should be shown
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (!this.tripsPart.current) {
          this.props.searchBarShow(false);
        }
        if (
          this.tripsPart.current &&
          lastScrollY > this.tripsPart.current.offsetTop - 460 &&
          !this.props.searchBarVisible
        ) {
          this.props.searchBarShow(true);
        }
        // Else if search bar is showing but should not be shown
        else if (
          this.tripsPart.current &&
          lastScrollY <= this.tripsPart.current.offsetTop - 460 &&
          this.props.searchBarVisible
        ) {
          this.props.searchBarShow(false);
        }
        ticking = false;
      });
    }
    ticking = true;
  };

  render() {
    // console.log(this.props)
    const { trips, profile, auth, isLoading } = this.props;
    const isInitialized = trips && !isLoading;

    // If company is logged in, redirect to company profile
    if (profileType(auth, profile) === 'Company') {
      return <Redirect to={'/companyprofile/' + auth.uid} />;
    }

    if (isInitialized) {
      return (
        <div className="homePage">
          <div class="trip-title d-sm-block d-none">
            <img src={background} className="img-fluid mw-100"></img>
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
          <div id="tripcards" ref={this.tripsPart}>
            <hr className="greenline mw-100"></hr>

            <div className="row justify-content-center justify-content-around align-items-end">
              <h1 className="home-heading mt-5">ALL TRIPS</h1>
              <img src={logo_wt} className="logo-no-text logo-dims ml-3"></img>
            </div>
            <div className="container">
              <TripsList trips={trips} />
            </div>
          </div>
        </div>
      );
    } else {
      // to show page reload while trips are being requested
      return <div>Loading...</div>;
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
