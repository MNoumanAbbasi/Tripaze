// For modularity, creating a separate component for trip cards

import React from 'react'
import { Link } from 'react-router-dom'

const TripCard = ({trip}) => {
    return (
        <Link to={'/trip/' + trip.id}>
            <div className="card z-depth-0 trip-card">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{trip.title}</span>
                    <p>Destination: {trip.destinations}</p>
                    <p>From: {trip.departureLoc}</p>
                    <p>Price: Rs. {trip.price}</p>
                    <p>By:<Link to={'/companyProfile/'+trip.companyId}>{" " + trip.companyName}</Link></p>
                    <p className="grey-text">Date: {trip.departureDate}</p>
                </div>
            </div>
        </Link>

    )
}

export default TripCard