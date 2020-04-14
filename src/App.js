import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar  from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import TripDetails from './components/trips/TripDetails'
import SignIn from './components/auth/SignIn';
import SignUpUser from './components/auth/SignUpUser';
import SignUpCompany from './components/auth/SignUpCompany';
import CreateTrip from './components/trips/CreateTrip';
import SignUpChoice from './components/auth/SignUpChoice';
import CompanyProfile from './components/companyProfile/CompanyProfile';

// switch ensures that only one route is loaded at  a time

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path='/' component={Dashboard}/>
            <Route path='/signin' component={SignIn}/>
            <Route path='/signupuser' component={SignUpUser}/>
            <Route path='/signupcompany' component={SignUpCompany}/>
            <Route path='/createtrip' component={CreateTrip}/>
            <Route path='/trip/:id' component={TripDetails}/>
            <Route path='/signupchoice' component={SignUpChoice}/>
            <Route path='/companyprofile/:id' component={CompanyProfile}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
