import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
// import { Redirect } from 'react-router-dom'



// class container section is material
// class trip-details is from our own css
// taking props to know which trip to load
function TripDetails(props) {
    const { trip } = props // getting trip category from props

    // TODO
    // if (auth.uid is a company id) {
    //      show trip details page from company perspective
    // }
    if (trip) {
        return (
            <div className="container section trip-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{trip.title}</span>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Company: {trip.company}</div>
                        <div>Cost: Rs. {trip.price}</div>
                        <div>To: {trip.destinations}</div>
                        <div>On: {trip.departureDate}</div>
                        <div>From: {trip.departureLoc}</div>
                        <div>Description: {trip.description}</div>
                        <div>Attractions: {trip.attraction}</div>
                    </div>
                </div>
            </div>
        )
    } else { // this is important since we need to show something while the trip is being fetched
        return (
            <div className="container center">
                <p>Loading trip...</p>
            </div>
        )
    }
}

// ownProps are the props of the component before we attach anything to it
const mapStateToProps = (state, ownProps) => {
    console.log("trip", state)
    const id = ownProps.match.params.id
    const trips = state.firestore.data.Trips // using data instead of ordered here since we are interested in referencing specific trips (hash table)
    const trip = trips ? trips[id] : null // if there are any projects, find the project with the given data
    return {
        trip: trip,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'Trips'}
    ])
)(TripDetails)
