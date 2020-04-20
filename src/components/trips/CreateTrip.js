import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTrip } from '../../store/actions/tripActions';
import { Redirect } from 'react-router-dom';
import { profileType } from '../../Helpers';
import DestinationSection from './DestinationSection';
// all css are from the materialized CSS class
export class CreateTrip extends Component {
  state = {
    title: '',
    destinations: [],
    departureLoc: '',
    departureDate: '',
    duration: 0,
    price: 0,
    capacity: 0,
    description: '',
    attraction: '',
    image: '',
  };

  handleChange = (e) => {
    this.setState({
      // store the input on form fields on the state
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    // dont want the default action of page being reloaded
    e.preventDefault();
    // console.log(this.state)

    // calls the createTrip function in mapDispatchToProps which in turn calls dispatch with an action of createTrip that handles the asynch request. This request is then sent to the reducer for dispatch
    this.props.createTrip(this.state, this.props.profile);
    this.props.history.push('/');
  };

  render() {
    const { auth, profile, isLoading } = this.props;
    const isInitialized = !isLoading && profile && auth;

    if (isInitialized && profileType(auth, profile) !== 'Company') {
      return <Redirect to="/" />;
    }

    if (!isInitialized) {
      return <div>Loading...</div>;
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="gre-text text-darken-3">Create Trip</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>

          <DestinationSection />

          <div className="input-field">
            <label htmlFor="departureLoc">Departure Location</label>
            <input type="text" id="departureLoc" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="departureDate">Departure Date</label>
            <input
              type="date"
              id="departureDate"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="duration">Duration</label>
            <input type="number" id="duration" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="capacity">Capacity</label>
            <input type="number" id="capacity" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              onChange={this.handleChange}
              className="materialize-textarea"
            ></textarea>
          </div>

          <div className="input-field">
            <label htmlFor="attraction">Attractions</label>
            <textarea
              id="attraction"
              onChange={this.handleChange}
              className="materialize-textarea"
            ></textarea>
          </div>

          <div className="input-field">
            <label htmlFor="image">Drag-drattractionop or</label>
            <button className="btn blue lighten-1 z-depth-1">Upload</button>
          </div>

          <div className="input-field">
            <button className="btn blue lighten-1 z-depth-1">Submit</button>
          </div>
        </form>

        <div className="input-field">
          <button className="btn grey lighten-1 z-depth-1">Cancel</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.auth.currProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // so when we call props.createTrip, it's gonna perform a dispatch using the asynch middleware createTrip in src/store/actions
    createTrip: (trip, profile) => dispatch(createTrip(trip, profile)),
  };
};

// passing null since mapStateToProps = null
export default connect(mapStateToProps, mapDispatchToProps)(CreateTrip);
