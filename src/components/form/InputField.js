import React from 'react';
import { Field, ErrorMessage } from 'formik';

const InputField = ({ label, name, type, className, as = '' }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <Field name={name} type={type} min="0" as={as} className="form-control" />
      <ErrorMessage name={name} />
    </div>
  );
};

export default InputField;
