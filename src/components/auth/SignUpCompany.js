import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUpCompany } from '../../store/actions/authActions'

// TODO: CHANGE THIS TO MAKE IT A USER
// all css are from the materialized CSS class
export class SignUpCompany extends Component {
    state = {
        email: '',
        password: '',
        userName: ''
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
        this.props.signUp(this.state)
    }

    
    
    render() {
        const { auth, authError } = this.props

        if (auth.uid) {
            return <Redirect to='/'/>
        }

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="gre-text text-darken-3">Sign Up as Company</h5>
                    <div className="input-field">
                        <label htmlFor="companyName">Company Name</label>
                        <input type="text" id="companyName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="contact">Contact Number</label>
                        <input type="number" id="contact" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="btn blue lighten-1 z-depth-1">Sign Up</button>
                    </div>
                    
                    {/* To display sign up error */}
                    <div className="red-text center">
                        { authError ? <p>{authError}</p> : null}
                    </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUpCompany(newUser))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUpCompany)