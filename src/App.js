import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import TripDetails from './components/trips/TripDetails';
import SignIn from './components/auth/SignIn';
import SignUpUser from './components/auth/SignUpUser';
import SignUpCompany from './components/auth/SignUpCompany';
import CreateTrip from './components/trips/CreateTrip';
import SignUpChoice from './components/auth/SignUpChoice';
import CompanyProfile from './components/companyProfile/CompanyProfile';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { authProfileLoad } from './store/actions/authActions';
import './App.css';
import SearchResults from './components/SearchResults/SearchResults';
import EditTrip from './components/trips/EditTrip';
import LoadingBox from './components/dashboard/LoadingBox';
import EditProfile from './components/companyProfile/EditProfile';

// switch ensures that only one route is loaded at  a time
class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.authProfileLoad(user);
      }
    });
  }

  render() {
    const { profileLoading } = this.props;
    if (profileLoading) return <LoadingBox />;
    else
      return (
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signupuser" component={SignUpUser} />
              <Route path="/signupcompany" component={SignUpCompany} />
              <Route path="/createtrip" component={CreateTrip} />
              <Route path="/trip/:id" component={TripDetails} />
              <Route path="/edittrip/:id" component={EditTrip} />
              <Route path="/searchResults/" component={SearchResults} />
              <Route path="/signupchoice" component={SignUpChoice} />
              <Route path="/companyprofile/:id" component={CompanyProfile} />
              <Route path="/editprofile/:id" component={EditProfile} />
            </Switch>
          </div>
        </BrowserRouter>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    profileLoading: state.auth.profileLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authProfileLoad: (user) => dispatch(authProfileLoad(user)), // pass this to the actions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
