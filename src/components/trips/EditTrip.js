import React from 'react';
import { connect } from 'react-redux';
import { editTrip } from '../../store/actions/tripActions';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import FieldArraySection from './FieldArraySection';
import ImageSection from './ImageSection';
import { Formik, Form } from 'formik';
import { tripSchema, InputField } from './CreateTrip';

const EditTrip = (props) => {
  const { trip, profile, isLoading, auth } = props;
  const isInitialized = !isLoading && trip;
  const adminMode = trip && auth.uid === trip.companyId;

  if (!isInitialized) {
    return <div>Loading...</div>;
  } else if (!adminMode) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container">
      <h5 className="gre-text text-darken-3">Create Trip</h5>
      <Formik
        initialValues={{
          title: trip.title,
          destinations: trip.destinations,
          departureLoc: trip.departureLoc,
          departureDate: trip.departureDate,
          duration: trip.duration,
          price: trip.price,
          capacity: trip.capacity,
          description: trip.description,
          attractions: trip.attractions,
          image: trip.image,
        }}
        validationSchema={tripSchema}
        onSubmit={(values) => {
          console.log(values);
          props.editTrip(values, props.match.params.id);
          props.history.push('/');
        }}
      >
        {({ values }) => (
          <Form>
            <InputField label="Title" name="title" type="text" />

            <FieldArraySection
              label="Destination(s)"
              name="destinations"
              values={values}
            />

            <InputField
              label="Departure Location"
              name="departureLoc"
              type="text"
            />
            <InputField
              label="Departure Date"
              name="departureDate"
              type="date"
            />
            <InputField label="Duration" name="duration" type="number" />
            <InputField label="Price" name="price" type="number" />
            <InputField label="Capacity" name="capacity" type="number" />
            <InputField
              label="Description"
              name="description"
              type="text"
              as="textarea"
            />
            <FieldArraySection
              label="Attraction(s)"
              name="attractions"
              values={values}
            />
            <label htmlFor="image-section" style={{ display: 'block' }}>
              Upload Image
            </label>
            <ImageSection
              className="image-section"
              imageName={values.image}
              handleImgNameChange={(img) => (values.image = img)}
            />

            <button
              type="button"
              className="btn grey lighten-1 z-depth-1"
              onClick={() => props.history.push('/')}
            >
              Cancel
            </button>
            <button type="submit" className="btn form-rounded r-green-button">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

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
