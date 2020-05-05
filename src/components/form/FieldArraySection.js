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
              <div className="row">
                {values &&
                  values[name].map((dest, ind) => {
                    return (
                      <div key={ind}>
                        <button
                          type="button"
                          class="btn r-green-button form-rounded ml-3"
                          onClick={() => remove(ind)}
                        >
                          {dest}
                          <i class="fa fas fa-times-circle ml-1 text-white fa-fw"></i>
                        </button>
                      </div>
                    );
                  })}
              </div>
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
