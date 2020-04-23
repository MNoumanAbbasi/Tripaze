import React from 'react';
import { Link } from 'react-router-dom';
import SignedInUserLinks from './SignedInUserLinks';
import SignedInCompanyLinks from './SignedInCompanyLinks';
import GuestUserLinks from './GuestUserLinks';
import { connect } from 'react-redux'; // note: we do not need firebaseConnect here since we do not need to be in connect to firestore. We need to just connect to our redux state
import logo from '../../logo.png';
import { profileType } from '../../Helpers';

const  = (props) => {
  const { auth, profile } = props;

  if (profileType(auth, profile) === 'Company') {

  return ()
  }}
  