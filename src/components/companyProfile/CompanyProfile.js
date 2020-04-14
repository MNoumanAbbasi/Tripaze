import React, {Component } from 'react'
import TripsList from '../trips/TripsList'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase' // higher order
import { Redirect } from 'react-router-dom'

// 6 columns on medium and 12 column on small screens
class CompanyProfile extends Component {
    render() {
        // console.log(this.props)
        const { trips, auth } = this.props;

        // TODO
        // if (auth.uid is a company id) {
        //     <Redirect to={'/companyprofile/' + auth.uid}/>
        // }
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <TripsList trips={trips}/>
                    </div>
                </div>
            </div>
        )
    }
}
// Map state from store to props in component
const mapStateToProps = (state) => {
    console.log(state);
    return {
        trips: state.firestore.ordered.trip, 
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    // tells us which collections to connect to in our firebase project whenever this component, namely dashboard, is active
    // Whenever collection trip is changed, it would call the firestore reducer which would update the state of this firestore
    firestoreConnect([
        { collection: 'trip'}
    ]) 
)(CompanyProfile)
