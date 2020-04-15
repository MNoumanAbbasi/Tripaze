// Since this component has no state, this will be a functional component rather than a class component

import React from 'react'
import { Link } from 'react-router-dom'
import SignedInUserLinks from './SignedInUserLinks'
import SignedInCompanyLinks from './SignedInCompanyLinks'
import GuestUserLinks from './GuestUserLinks'
import { connect } from 'react-redux' // note: we do not need firebaseConnect here since we do not need to be in connect to firestore. We need to just connect to our redux state

 const Navbar = (props) => {
     const { auth, profile } = props;
     // if auth id exists then you know that the user is signed in
     // TODO: Check if the user is company or a user
     var currProfile = profile.currProfile ? profile.currProfile : null
     var links;

     // TODO: FIX THIS GAAD
     if (auth.uid && !currProfile) {
        links = <SignedInUserLinks profile={currProfile}/>
     }
     else if (auth.uid && currProfile) {
         if (currProfile.type == "Company") {
            links = <SignedInCompanyLinks profile={currProfile}/>
        } else {
            links = <SignedInUserLinks profile={currProfile}/>
         }
     } else {
        links = <GuestUserLinks/>
     }
     return (
        // all classnames are through material UI. Link is to homepage
        <nav className="nav-wrapper grey darken-3">
            <div className="container"> 
                <Link to='/' className="brand-logo">Tripaze</Link>   
                { links }
            </div>
        </nav>                

     )
 }

 const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth, 
        profile: state.auth
    }
}  

 // Exporting to be used in app.js
 export default connect(mapStateToProps)(Navbar)