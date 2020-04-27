import React from 'react';
import GeneralDialogBox from './GeneralDialogBox';

function Confirmation(props) {
  const cancelButton = (
    <button
      type="button"
      class="btn btn-lg r-green-button form-rounded fix-width"
      onClick={props.onHide}
    >
      Cancel
    </button>
  );
  const deleteButton = (
    <button
      type="button"
      class="btn btn-lg r-red-button form-rounded fix-width"
      onClick={props.onDelete}
    >
      Yes
    </button>
  );
  const buttons = [cancelButton, deleteButton];
  return (
    <GeneralDialogBox
      show={props.show}
      onHide={props.onHide}
      buttons={buttons}
      title="Deleting Trip"
      message="You are about to delete a trip. Are you sure you want to continue?"
    />
  );
}

export default Confirmation;
