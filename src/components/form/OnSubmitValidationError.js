import React from 'react';
import { connect } from 'formik';

const OnSubmitValidationError = (props) => {
  const { errors, formik } = props;

  const effect = () => {
    if (formik.submitCount > 0 && !formik.isSubmitting && !formik.isValid) {
      console.log(errors);
    }
  };
  React.useEffect(effect, [formik.submitCount, formik.isSubmitting]);
  return null;
};

export default connect(OnSubmitValidationError);
