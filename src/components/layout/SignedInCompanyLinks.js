// Since this component has no state, this will be a functional component rather than a class component

import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

// this is a functional component, not a class, so we need to pass the props as argument
const SignedInCompanyLinks = (props) => {
    console.log(props)
    const initial = props.profile ? props.profile.companyName : null
    return (
        // <ul className="right">
        //     <li><NavLink to='/' className='btn btn-floating pink lighten-1'>
        //         {initial}
        //     </NavLink></li>
        //     <li><a onClick={props.signOut}>Sign Out</a></li>
        //     <li><NavLink to='/createtrip'>Create Trip</NavLink></li>
        // </ul>

        <div class="collapse navbar-collapse " id="navbarSupportedContent">
            <ul class="navbar-nav navbar-fonts ml-auto justify-content-end">
                <li class="nav-item">
                    <NavLink to="/reatetrip" class="nav-link">
                        Create Trip
                    </NavLink>
                </li>
                <li class="nav-item">
                    <NavLink to="/" class="nav-link">
                        {initial}
                    </NavLink>
                </li>
                <li class="nav-item nav-link">
                    <a onClick={props.signOut}>Sign Out</a>
                </li>
            </ul>
        </div>

    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

// Exporting to be used in app.js
export default connect(null, mapDispatchToProps)(SignedInCompanyLinks) 
