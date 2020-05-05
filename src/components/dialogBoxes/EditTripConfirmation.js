import React from 'react';
import GeneralDialogBox from './GeneralDialogBox';

function EditTripConfirmation(props) {
  const editButton = (
    <button
      type="button"
      key="Yes"
      class="btn btn-secondary dark-button mr-lg-3 my-2 my-lg-0 form-rounded"
      onClick={props.onDelete}
    >
      Yes
    </button>
  );
  const buttons = [editButton];
  return (
    <GeneralDialogBox
      show={props.show}
      onHide={props.onHide}
      buttons={buttons}
      title="Editing Trip"
      message="You are about to edit the trip. Are you sure you want to continue?"
    />
  );
}

export default EditTripConfirmation;
