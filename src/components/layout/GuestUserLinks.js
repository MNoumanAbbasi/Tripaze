// Since this component has no state, this will be a functional component rather than a class component

import React from 'react'
import { NavLink } from 'react-router-dom'

 const GuestUserLinks = () => {
     return (
        <ul className="right">
            <li><NavLink to='/signin'>Sign In</NavLink></li>
            <li><NavLink to='/signupchoice'>Sign Up</NavLink></li>
        </ul>              

     )
 }

 // Exporting to be used in app.js
 export default GuestUserLinks 
