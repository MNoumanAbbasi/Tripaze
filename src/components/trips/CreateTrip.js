import React from 'react';
import { connect } from 'react-redux';
import { createTrip } from '../../store/actions/tripActions';
import { Redirect } from 'react-router-dom';
import { profileType } from '../../Helpers';
import FieldArraySection from '../form/FieldArraySection';
import InputField from '../form/InputField';
import ImageSection from '../form/ImageSection';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import LoadingBox from './../dashboard/LoadingBox';
import { succesfulCreateTripModal } from '../modals/TripModals';
import OnSubmitValidationError from '../form/OnSubmitValidationError';

/**
 * Validation schema for trip details. Used for both create and
 * edit trip forms.
 */
export const tripSchema = yup.object({
  title: yup.string().max(20, 'Max 20 characters').required('Required'),
  destinations: yup
    .array()
    .of(yup.string().required('Required'))
    .min(0, 'At least one destination required')
    .required('Required'),
  departureLoc: yup.string().max(10, 'Max 10 characters').required('Required'),
  departureDate: yup
    .date()
    .min(new Date(), 'Date should start from tomorrow')
    .required('Required'),
  duration: yup
    .number()
    .positive('Invalid duration')
    .max(60, 'Max duration 60')
    .required('Required'),
  price: yup
    .number()
    .positive('Invalid price')
    .max(99999, 'Max price 99999')
    .required('Required'),
  capacity: yup.number().positive('Invalid capactiy').max(1000, 'Max 1000'),
  description: yup.string().max(1500, 'Max 1500 characters'),
  attractions: yup.array().of(yup.string()),
  image: yup.string(),
});

const CreateTrip = (props) => {
  const { auth, profile, isLoading } = props;
  const isInitialized = !isLoading && profile && auth;

  // If this user is not authorized to create trip
  if (isInitialized && profileType(auth, profile) !== 'Company') {
    return <Redirect to="/" />;
  }

  // Page not loaded
  if (!isInitialized) {
    return <LoadingBox />;
  }
  // Else page loaded
  return (
    <div className="container border mb-4 mt-5 object-shadow">
      <div className="row mt-5">
        <div className="mt-5 col-lg-12 text-center">
          <h1 className="mt-5 text-turq">CREATE TRIP</h1>
          <hr class="mt-2 bg-turq col-6 divider"></hr>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <Formik
            initialValues={{
              title: '',
              destinations: [],
              departureLoc: '',
              departureDate: '',
              duration: 0,
              price: 0,
              capacity: 0,
              description: '',
              attractions: [],
              image: '',
            }}
            validationSchema={tripSchema}
            onSubmit={(values) => {
              values.departureDate = new Date(values.departureDate);
              props.createTrip(values, props.profile);
              props.history.push('/');
              succesfulCreateTripModal();
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
                  className="image-section mb-5"
                  imageName={values.image}
                  imageCategory="trip"
                  handleImgNameChange={(img) => (values.image = img)}
                />

                <hr class="bg-turq col-10 mt-4 divider"></hr>
                <div className="row justify-content-end">
                  <button
                    type="button"
                    className="btn form-rounded red-button border-red"
                    onClick={() => props.history.goBack()}
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

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.auth.currProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTrip: (trip, profile) => dispatch(createTrip(trip, profile)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTrip);
