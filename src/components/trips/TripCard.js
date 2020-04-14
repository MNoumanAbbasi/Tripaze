// For modularity, creating a separate component for trip cards

import React from 'react'

const TripCard = ({trip}) => {
    return (
        <div className="card z-depth-0 trip-card">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{trip.title}</span>
                <p>Destination: {trip.destinations}</p>
                <p>From: {trip.departureLoc}</p>
                <p>Price: {trip.price}</p>
                <p>By: {trip.company}</p>
                <p className="grey-text">Date: {trip.departureDate}</p>
            </div>
        </div>

    )
}

export default TripCard