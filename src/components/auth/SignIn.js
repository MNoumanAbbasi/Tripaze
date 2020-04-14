import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase' // higher order

// all css are from the materialized CSS class
export class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            // is an email being entered or a password?
            [e.target.id]: e.target.value
        })
    }
    
    handleSubmit = (e) => {
        // dont want the default action of page being reloaded
        e.preventDefault();
        this.props.signIn(this.state)
    }

    render() {
        const { authError, auth } = this.props

        if (auth.uid) {
            return <Redirect to='/'/>
        }
        
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="gre-text text-darken-3">Sign In</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="btn blue lighten-1 z-depth-1">Sign In</button>
                        <div className="red-text center">
                            { authError ? <p>{authError}</p> : null}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        authError: state.auth.authError, // in root reducer check auth property and the authError in that property
        auth: state.firebase.auth
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds)) // pass this to the actions
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    // tells us which collections to connect to in our firebase project whenever this component, namely dashboard, is active
    // Whenever collection trip is changed, it would call the firestore reducer which would update the state of this firestore
    firestoreConnect([
        { collection: 'Users'}
    ]) 
)(SignIn)
