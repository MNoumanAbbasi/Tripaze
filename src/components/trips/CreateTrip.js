import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTrip } from '../../store/actions/tripActions';
import { Redirect } from 'react-router-dom';
import { profileType } from '../../Helpers';
import FieldArraySection from './FieldArraySection';
import ImageSection from './ImageSection';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { set } from 'jsonpointer';
import * as yup from 'yup';

const InputField = ({ label, name, type }) => {
  return (
    <div className="input-field">
      <label htmlFor={name} style={{ display: 'block' }}>
        {label}
      </label>
      <Field name={name} type={type} min="0" />
      <ErrorMessage name={name} />
    </div>
  );
};

const createTripSchema = yup.object({
  title: yup.string().max(25, 'Max 25 characters').required('Required'),
  destinations: yup.array().required('Required'),
  departureLoc: yup.string().max(15, 'Max 15 characters').required('Required'),
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
    .max(999999, 'Max price 999999')
    .required('Required'),
  capacity: yup.number().positive('Invalid capactiy').required('Required'),
  description: yup.string(),
  attractions: yup.array().required('Required'),
  image: yup.string(),
});

const CreateTrip = (props) => {
  // const [title, setTitle] = useState('');
  // const [destinations, setDestinations] = useState([]);
  // const [departureLoc, setDepartureLoc] = useState('');
  // const [departureDate, setDepartureDate] = useState('');
  // const [duration, setDuration] = useState(0);
  // const [price, setPrice] = useState(0);
  // const [capacity, setCapacity] = useState(0);
  // const [description, setDescription] = useState(0);
  // const [attraction, setAttraction] = useState('');
  // const [image, setImage] = useState('');

  // const handleImgAdd = (imgName) => {
  //   console.log('imgname', imgName);
  //   this.setState({
  //     image: imgName,
  //   });
  // };

  const { auth, profile, isLoading } = props;
  const isInitialized = !isLoading && profile && auth;

  if (isInitialized && profileType(auth, profile) !== 'Company') {
    return <Redirect to="/" />;
  }

  if (!isInitialized) {
    return <div>Loading...</div>; // TODO: Display loading box
  }
  return (
    <div className="container">
      <h5 className="gre-text text-darken-3">Create Trip</h5>
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
        validationSchema={createTripSchema}
        onSubmit={(values) => {
          props.createTrip(values, props.profile);
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
            <InputField label="Description" name="description" type="text" />
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

            <button type="button" className="btn grey lighten-1 z-depth-1">
              Cancel
            </button>
            <button type="submit" className="btn form-rounded r-green-button">Submit</button>
          </Form>
        )}

        {/* <div className="input-field">
          <button className="btn blue lighten-1 z-depth-1">Submit</button>
        </div> */}
      </Formik>
      <div className="input-field"></div>
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
    // so when we call props.createTrip, it's gonna perform a dispatch using the asynch middleware createTrip in src/store/actions
    createTrip: (trip, profile) => dispatch(createTrip(trip, profile)),
  };
};

// passing null since mapStateToProps = null
export default connect(mapStateToProps, mapDispatchToProps)(CreateTrip);
