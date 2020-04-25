import React, { useState } from 'react';
import { FieldArray } from 'formik';

const FieldArraySection = ({ label, name, values }) => {
  const [newEntry, setNewEntry] = useState('');
  return (
    <div className="container">
      <label htmlFor={name} style={{ display: 'block' }}>
        {label}
      </label>
      <FieldArray name={name}>
        {({ push, remove }) => {
          const handleAdd = () => {
            push(newEntry);
            setNewEntry('');
          };
          return (
            <div>
              {values[name].map((dest, ind) => {
                return (
                  <div key={ind}>
                    {dest}
                    <button type="button" onClick={() => remove(ind)}>
                      Remove
                    </button>
                  </div>
                );
              })}
              <div className="input-field">
                <input
                  type="text"
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                />
                <button type="button" onClick={handleAdd}>
                  Add
                </button>
              </div>
            </div>
          );
        }}
      </FieldArray>
    </div>
  );
};

export default FieldArraySection;
