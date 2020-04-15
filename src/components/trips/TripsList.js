import React from 'react'
import TripCard from './TripCard'
import { Link } from 'react-router-dom'

// z-depth-0 removes shadows
// trip card and trip-lists are your own css
const TripsList = ({trips}) => {
    return (
        <div className="trip-list section">
            {/* If we have trips, then map. Otherwise don't */}
            { trips && trips.map(trip => {
                return (
                    <TripCard trip={trip} />
                )
            })}
        </div>
    )
}

export default TripsList