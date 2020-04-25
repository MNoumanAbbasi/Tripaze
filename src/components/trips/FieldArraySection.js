import React, { useState } from 'react';
import { FieldArray } from 'formik';

const FieldArraySection = ({ label, name, values }) => {
  const [newDest, setNewDest] = useState('');
  return (
    <div className="container">

      <FieldArray name={name}>
        {({ push, remove }) => {
          const handleAdd = () => {
            push(newDest);
            setNewDest('');
          };
          return (
            <div>
              {values.destinations.map((dest, ind) => {
                return (
                  <div>
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
                  value={newDest}
                  onChange={(e) => setNewDest(e.target.value)}
                />
                <button type="button" onClick={handleAdd}>
                  Add destination
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
