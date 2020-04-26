import React from 'react';
import { Field, ErrorMessage } from 'formik';

export const InputField = ({ label, name, type, as = '' }) => {
    return (
      <div className="input-field">
        <label htmlFor={name} style={{ display: 'block' }}>
          {label}
        </label>
        <Field name={name} type={type} min="0" as={as} />
        <ErrorMessage name={name} />
      </div>
    );
  };
  