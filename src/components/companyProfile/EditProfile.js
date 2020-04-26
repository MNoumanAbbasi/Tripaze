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
  companyName: yup.string().max(20, 'Max 20 characters').required('Required'),
  contact: yup
    .number()
    .typeError('Invalid phone number')
    .positive('Invalid phone number')
    .min(10, 'Too short')
    .max(11, 'Too long')
    .required('Required'),
  location: yup.string().max(15, 'Max 15 characters').required('Required'),
  description: yup.string().max(1000, 'Max 15 characters').required('Required'),
  logoImage: yup.string(),
  coverImage: yup.string(),
});

const EditProfile = (props) => {
  const { auth, company, profile, isLoading } = props;
  const isInitialized = !isLoading && profile && auth;
  const adminMode = auth.uid === props.match.params.id;

  if (!isInitialized) {
    return <div>Loading...</div>;
  } else if (!adminMode) {
    return <Redirect to="/" />;
  }
  console.log(company)
  return (
    <div className="container">
      <h5 className="gre-text text-darken-3">Create Trip</h5>
      <Formik
        initialValues={{
          companyName: company.companyName,
          contact: company.contact,
          location: company.location,
          type: company.type,
          description: company.description,
          logoImage: company.logoImage,
          coverImage: company.coverImage,
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
            <InputField label="Contact Number" name="contact" type="number" />

            <InputField label="Company Address" name="location" type="text" />
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
              imageCategory="companyLogo"
              handleImgNameChange={(img) => (values.logoImage = img)}
            />

            <label htmlFor="cover-image" style={{ display: 'block' }}>
              Upload Background Cover
            </label>
            <ImageSection
              className="cover-image"
              imageName={values.coverImage}
              imageCategory="companyCover"
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

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const companies = state.firestore.data.Companies;
  const company = companies ? companies[id] : null;
  const requests = state.firestore.status.requesting;
  const isLoading = requests
    ? Object.values(requests).some((value) => value === true)
    : null;
  return {
    company: company,
    profile: state.auth.currProfile,
    isLoading: isLoading,
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
