import React, {Component } from 'react'
import TripsList from '../trips/TripsList'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase' // higher order
import { db } from '../../config/fbConfig'

// 6 columns on medium and 12 column on small screens
class CompanyProfile extends Component {
    _isMounted = false;

    state = {
        companyName: '',
    }

    componentDidMount() {
        this._isMounted = true;
        db
        .collection("Companies")
        .doc(this.props.uid)
        .get()
        .then ((data) => {
            if (this._isMounted)
                this.setState({companyName: data.data().companyName});
        })
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        // console.log(this.props)
        const { trips, uid } = this.props;

        var tripsFiltered = null
        if (trips) 
            tripsFiltered = trips.filter(trip => (trip.companyId === uid))
        
        return (
            <div className="dashboard container">
                <h5 className="gre-text text-darken-3">Company Profile: {this.state.companyName}</h5>
                <div className="row">
                    <div className="col s12 m6">
                        <TripsList trips={tripsFiltered}/>
                    </div>
                </div>
            </div>
        )


        
    }
}
// Map state from store to props in component
const mapStateToProps = (state, ownProps) => {
    // const id = ownProps.match.params.id
    return {
        trips: state.firestore.ordered.Trips, 
        auth: state.firebase.auth,
        profile: state.auth,
        uid: ownProps.match.params.id
    }
}

export default compose(
    connect(mapStateToProps),
    // tells us which collections to connect to in our firebase project whenever this component, namely dashboard, is active
    // Whenever collection trip is changed, it would call the firestore reducer which would update the state of this firestore
    firestoreConnect([
        { collection: 'Trips' }
    ]) 
)(CompanyProfile)
