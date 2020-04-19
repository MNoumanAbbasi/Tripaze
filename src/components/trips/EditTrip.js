import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editTrip } from '../../store/actions/tripActions';
import { Redirect } from 'react-router-dom';
import { profileType } from '../../Helpers';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

// all css are from the materialized CSS class
export class EditTrip extends Component {
  state = {
    title: '',
    destinations: '',
    departureLoc: '',
    departureDate: '',
    duration: 0,
    price: 0,
    capacity: 0,
    description: '',
    attraction: '',
    image: '',
    notUpdated: true,
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
    this.props.editTrip(this.state, this.props.match.params.id);
    this.props.history.push('/');
  };

  // TODO: Change this to a better method
  getDefaults = (trip) => {
    if (this.state.notUpdated) {
      this.setState({
        title: trip.title,
        destinations: trip.destinations,
        departureLoc: trip.departureLoc,
        departureDate: trip.departureDate,
        duration: trip.duration,
        price: trip.price,
        capacity: trip.capacity,
        description: trip.description,
        attraction: trip.attraction,
        image: trip.image,
        notUpdated: false,
      });
    }
  };

  render() {
    const { trip, profile, isLoading, auth } = this.props;
    console.log(this.state);
    const isInitialized = !isLoading && trip;
    const adminMode = auth.uid === trip.companyId;
    if (!isLoading && !adminMode) {
      return <Redirect to="/" />;
    }

    if (!isInitialized) {
      return <div>Loading...</div>;
    } else {
      // {
      //   this.getDefaults(trip);
      // }
      return (
        <div className="container" active={this.getDefaults(trip)}>
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="gre-text text-darken-3">Create Trip</h5>
            <div className="input-field">
              <label htmlFor="title">Title</label>
              <input
                value={this.state.title}
                type="text"
                id="title"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="destinations">Destinations</label>
              <input
                value={this.state.destinations}
                type="text"
                id="destinations"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="departureLoc">Departure Location</label>
              <input
                value={this.state.departureLoc}
                type="text"
                id="departureLoc"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="departureDate">Departure Date</label>
              <input
                value={this.state.departureDate}
                type="date"
                id="departureDate"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="duration">Duration</label>
              <input
                value={this.state.duration}
                type="number"
                id="duration"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="price">Price</label>
              <input
                value={this.state.price}
                type="number"
                id="price"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="capacity">Capacity</label>
              <input
                value={this.state.capacity}
                type="number"
                id="capacity"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="description">Description</label>
              <textarea
                value={this.state.description}
                id="description"
                onChange={this.handleChange}
                className="materialize-textarea"
              ></textarea>
            </div>

            <div className="input-field">
              <label htmlFor="attraction">Attractions</label>
              <textarea
                value={this.state.attraction}
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
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const trips = state.firestore.data.Trips; // using data instead of ordered here since we are interested in referencing specific trips (hash table)
  const trip = trips ? trips[id] : null; // if there are any projects, find the project with the given data
  const requests = state.firestore.status.requesting;
  const isLoading = requests
    ? Object.values(requests).some((value) => value === true)
    : null;
  return {
    auth: state.firebase.auth,
    profile: state.auth.currProfile,
    trip: trip,
    isLoading: isLoading, // all must be loaded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // so when we call props.createTrip, it's gonna perform a dispatch using the asynch middleware createTrip in src/store/actions
    editTrip: (trip, tripID) => dispatch(editTrip(trip, tripID)),
  };
};

// passing null since mapStateToProps = null
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [
    {
      collection: 'Trips',
      doc: props.match.params.id,
    },
  ])
)(EditTrip);
