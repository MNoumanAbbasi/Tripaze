import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import ImageSection from '../form/ImageSection';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FieldArraySection from '../form/FieldArraySection';
import InputField from '../form/InputField';
import { editProfile } from '../../store/actions/profileActions';
import * as yup from 'yup';

const profileSchema = yup.object({
  //   title: yup.string().max(20, 'Max 20 characters').required('Required'),
  //   destinations: yup
  //     .array()
  //     .of(yup.string().required('Required'))
  //     .min(0, 'At least one destination required')
  //     .required('Required'),
  //   departureLoc: yup.string().max(10, 'Max 10 characters').required('Required'),
  //   departureDate: yup
  //     .date()
  //     .min(new Date(), 'Date should start from tomorrow')
  //     .required('Required'),
  //   duration: yup
  //     .number()
  //     .positive('Invalid duration')
  //     .max(60, 'Max duration 60')
  //     .required('Required'),
  //   price: yup
  //     .number()
  //     .positive('Invalid price')
  //     .max(99999, 'Max price 99999')
  //     .required('Required'),
  //   capacity: yup
  //     .number()
  //     .positive('Invalid capactiy')
  //     .max(1000, 'Max 1000')
  //     .required('Required'),
  //   description: yup.string(),
  //   attractions: yup.array().of(yup.string()),
  //   image: yup.string(),
});

const EditProfile = (props) => {
  const { auth, profile, isLoading } = props;
  const isInitialized = !isLoading && profile && auth;
  const adminMode = auth.uid === props.match.params.id;

  // if (!isInitialized) {
  //   return <div>Loading...</div>;
  // } else if (!adminMode) {
  //   return <Redirect to="/" />;
  // }
  return (
    <div className="container">
      {console.log('heelo')}
      <h5 className="gre-text text-darken-3">Create Trip</h5>
      <Formik
        initialValues={{
          companyName: '',
          contact: 0,
          location: '',
          type: 'Company',
          description: '',
          logoImage: '',
          coverImage: '',
        }}
        validationSchema={profileSchema}
        onSubmit={(values) => {
          console.log(values);
          props.editProfile(values, props.match.params.id);
          props.history.push('/');
        }}
      >
        {({ values }) => (
          <Form>
            <InputField label="Company name" name="companyName" type="text" />

            {/* <div className="input-field">
              <label htmlFor="contact" style={{ display: 'block' }}>
                Contact Number
              </label>
              <Field name="contact" type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
              <ErrorMessage name="contact" />
            </div> */}
            <InputField label="Contact Number" name="contact" type="tel" />

            <InputField
              label="Company Address"
              name="location"
              type="text"
              as="textarea"
            />
            <InputField
              label="Description"
              name="description"
              type="text"
              as="textarea"
            />

            <label htmlFor="image-section" style={{ display: 'block' }}>
              Upload Logo
            </label>
            <ImageSection
              className="logo-image"
              imageName={values.logoImage}
              imageCategory='companyLogo'
              handleImgNameChange={(img) => (values.logoImage = img)}
            />

            <label htmlFor="cover-image" style={{ display: 'block' }}>
              Upload Background Cover
            </label>
            <ImageSection
              className="cover-image"
              imageName={values.coverImage}
              imageCategory='companyCover'
              handleImgNameChange={(img) => (values.coverImage = img)}
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

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (values, companyID) =>
      dispatch(editProfile(values, companyID)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [
    {
      collection: 'Companies',
      doc: props.match.params.id,
    },
  ])
)(EditProfile);
