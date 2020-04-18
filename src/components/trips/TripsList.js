import React from 'react';
import TripCard from './TripCard';

// z-depth-0 removes shadows
// trip card and trip-lists are your own css
const TripsList = ({ trips }) => {
  return (
    <div class="row justify-content-center">
      {trips &&
        trips.map((trip) => {
          return <TripCard trip={trip} key={trip.id} />;
        })}
    </div>
  );
};

export default TripsList;
