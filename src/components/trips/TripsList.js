import React from 'react';
import TripCard from './TripCard';

// Display trip cards as a list
const TripsList = ({ trips, isCompProfile }) => {
  return (
    <div class="row justify-content-center">
      {trips &&
        trips.map((trip) => {
          return (
            <TripCard trip={trip} key={trip.id} isCompProfile={isCompProfile} />
          );
        })}
    </div>
  );
};

export default TripsList;
