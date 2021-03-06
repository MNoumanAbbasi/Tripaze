import React from 'react';
import { connect } from 'react-redux';
import { editTrip } from '../../store/actions/tripActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import FieldArraySection from '../form/FieldArraySection';
import ImageSection from '../form/ImageSection';
import { Formik, Form } from 'formik';
import { tripSchema } from './CreateTrip';
import InputField from '../form/InputField';
import moment from 'moment';
import LoadingBox from './../dashboard/LoadingBox';
import { confirmEditModal } from '../modals/TripModals';
import { cancelModal } from '../modals/StandardModals';
import OnSubmitValidationError from '../form/OnSubmitValidationError';

const EditTrip = (props) => {
  const { trip, isLoading, auth } = props;
  const isInitialized = !isLoading && trip;
  // if user is the owner of the trip
  const adminMode = trip && auth.uid === trip.companyId;

  // if wrong id entered
  if (!isLoading && !trip && auth) props.history.push('/');

  // Page not loaded
  if (!isInitialized) {
    return <LoadingBox />;
  } else if (!adminMode) {
    // if user not owner, we go back
    props.history.goBack();
  }
  return (
    <div className="container border mb-4 mt-5 object-shadow">
      <div className="row mt-5">
        <div className="mt-5 col-lg-12 text-center">
          <h1 className="mt-5 text-turq">EDIT TRIP</h1>
          <hr class="mt-2 bg-turq col-6 divider"></hr>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <Formik
            initialValues={{
              title: trip.title,
              destinations: trip.destinations,
              departureLoc: trip.departureLoc,
              departureDate: moment(trip.departureDate.toDate()).format(
                'YYYY-MM-DD'
              ),
              duration: trip.duration,
              price: trip.price,
              capacity: trip.capacity,
              description: trip.description,
              attractions: trip.attractions,
              image: trip.image,
            }}
            validationSchema={tripSchema}
            onSubmit={(values) => {
              values.departureDate = new Date(values.departureDate);
              confirmEditModal(values, props);
            }}
          >
            {({ values, errors }) => (
              <Form>
                {/* Display error dialog box on validation errors */}
                <OnSubmitValidationError errors={errors} />

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
                  imageCategory="trip"
                  handleImgNameChange={(img) => (values.image = img)}
                />
                <hr class="bg-turq col-10 mt-4 divider"></hr>
                <div className="row justify-content-end">
                  <button
                    type="button"
                    className="btn form-rounded red-button border-red"
                    onClick={() => cancelModal(props.history)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 btn form-rounded r-green-button"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
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
