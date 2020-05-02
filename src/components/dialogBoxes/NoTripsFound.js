import React from 'react';
import GeneralDialogBox from './GeneralDialogBox';
import { NavLink } from 'react-router-dom';

function NoTripsFound(props) {
  const goBackButton = (
    <NavLink to="/" class="nav-link">
      <button
        type="button"
        key="GoBack"
        class="btn btn-lg r-green-button form-rounded fix-width"
        onClick={props.onHide}
      >
        Go Back
      </button>
    </NavLink>
  );
  const buttons = [goBackButton];
  return (
    <GeneralDialogBox
      show={props.show}
      onHide={props.onHide}
      buttons={buttons}
      title="No trips found"
      message={
        'No trips were found with the given search/filters. Please try a different destination.'
      }
    />
  );
}

export default NoTripsFound;
