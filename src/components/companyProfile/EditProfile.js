import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import ImageSection from '../form/ImageSection';
import { Formik, Form } from 'formik';
import InputField from '../form/InputField';
import { editProfile } from '../../store/actions/profileActions';
import * as yup from 'yup';

const profileSchema = yup.object({
  companyName: yup.string().max(20, 'Max 20 characters').required('Required'),
  contact: yup
    .string()
    .matches(/^[0-9]*$/, 'Invalid phone number')
    .min(10, 'Too short')
    .max(11, 'Too long')
    .required('Required'),
  location: yup.string().max(20, 'Max 20 characters').required('Required'),
  description: yup.string().max(1000, 'Max 15 characters').required('Required'),
  logoImage: yup.string(),
  coverImage: yup.string(),
});

const EditProfile = (props) => {
  const { auth, company, profile, isLoading } = props;
  const isInitialized = !isLoading && profile && auth;
  const adminMode = auth.uid === props.match.params.id;
  if (!isLoading && !company && auth) props.history.push('/'); // wrong id entered

  if (!isInitialized) {
    return <div>Loading...</div>;
  } else if (!adminMode) {
    return <Redirect to="/" />;
  }
  console.log(company);
  return (
    <div className="container border mb-4 mt-5 object-shadow">
      <div className="row mt-5">
        <div className="mt-5 col-lg-12 text-center">
          <h1 className="mt-5 text-turq">EDIT PROFILE</h1>
          <hr class="mt-2 bg-turq col-6 divider"></hr>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-8">
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
              console.log('New Profile', values);
              props.editProfile(values, props.match.params.id);
              props.history.push('/');
            }}
          >
            {({ values }) => (
              <Form>
                <InputField
                  label="Company name"
                  name="companyName"
                  type="text"
                />
                <InputField label="Contact Number" name="contact" type="text" />
                <InputField
                  label="Company Address"
                  name="location"
                  type="text"
                />
                <InputField
                  label="Description"
                  name="description"
                  type="text"
                  as="textarea"
                />
                <br />
                <label htmlFor="image-section" style={{ display: 'block' }}>
                  Upload Logo
                </label>
                <ImageSection
                  className="logo-image"
                  imageName={values.logoImage}
                  imageCategory="companyLogo"
                  handleImgNameChange={(img) => (values.logoImage = img)}
                />
                <br />
                <label htmlFor="cover-image" style={{ display: 'block' }}>
                  Upload Background Cover
                </label>
                <ImageSection
                  className="cover-image"
                  imageName={values.coverImage}
                  imageCategory="companyCover"
                  handleImgNameChange={(img) => (values.coverImage = img)}
                />
                <hr class="bg-turq col-10 mt-4 divider"></hr>
                <div className="row justify-content-end">
                  <button
                    type="button"
                    className="btn form-rounded r-red-button"
                    onClick={() => props.history.push('/')}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-4 btn form-rounded r-green-button"
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
