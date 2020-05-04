import React, { useState } from 'react';
import { FieldArray, ErrorMessage } from 'formik';

const FieldArraySection = ({ label, name, values }) => {
  const [newEntry, setNewEntry] = useState('');
  return (
    <div className="form-group">
      <label htmlFor={name} style={{ display: 'block' }}>
        {label}
      </label>
      <FieldArray name={name}>
        {({ push, remove }) => {
          const handleAdd = () => {
            if (newEntry) push(newEntry);
            setNewEntry('');
          };
          return (
            <div>
              {values &&
                values[name].map((dest, ind) => {
                  return (
                    <div key={ind} className="row">
                      <button
                        type="button"
                        class="mr-1 mt-0 btn btn-sm bg-white"
                        onClick={() => remove(ind)}
                      >
                        <i class="fa fas fa-times text-danger fa-fw"></i>
                      </button>
                      {dest}
                    </div>
                  );
                })}
              <div className="form-group row">
                <input
                  type="text"
                  className="form-control w-50"
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                />
                <button
                  type="button"
                  class="btn ml-3 mt-0 green-button border-turq"
                  onClick={handleAdd}
                >
                  <i class="fa fas fa-plus fa-fw"></i> Add
                </button>
              </div>
              <ErrorMessage name={name} />
            </div>
          );
        }}
      </FieldArray>
    </div>
  );
};

export default FieldArraySection;
