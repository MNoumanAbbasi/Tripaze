import React, { useState } from 'react';

const sampleDestination = [];

const Destination = (props) => {
  return (
    <div className="destination">
      <button
        className="remove-btn"
        onClick={() => props.removeDestination(props.dest)}
      >
        Remove
      </button>
      <p className="destination">{props.dest}</p>
    </div>
  );
};

const AddNewDestinationForm = (props) => {
  const [newDest, setNewDestination] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    props.addNewDestination(newDest);
  };

  return (
    <div className="addNewDestination">
      <input
        type="text"
        placeholder="Add destination"
        onChange={(event) => setNewDestination(event.target.value)}
        required
      />
      <button className="dark-button" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
};

const DestinationSection = (props) => {
  const destinations = props.destinationsArray;
  const setDestination = props.handleDestChange;
  const addNewDestination = (newDestination) => {
    setDestination([...destinations, newDestination]);
  };
  const removeDestination = (destToDelete) => {
    setDestination(destinations.filter((dest) => dest !== destToDelete));
  };

  // Button to display (add new or cancel) based on if add new faq form is open or not

  return (
    <div className="DestinationSection">
      {destinations.map((dest) => {
        return (
          <Destination
            key={dest}
            dest={dest}
            removeDestination={removeDestination}
          />
        );
      })}
      <AddNewDestinationForm addNewDestination={addNewDestination} />
    </div>
  );
};

export default DestinationSection;
