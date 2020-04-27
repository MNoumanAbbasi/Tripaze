import React from 'react';
import GeneralDialogBox from './GeneralDialogBox';

function Confirmation(props) {
  const cancelButton = (
    <button
      type="button"
      class="btn btn-lg r-green-button form-rounded object-hover"
      onClick={props.onHide}
    >
      Cancel
    </button>
  );
  const deleteButton = (
    <button
      type="button"
      class="btn btn-lg red-button form-rounded object-hover"
      onClick={props.onDelete}
    >
<<<<<<< HEAD
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure?</h4>
        <p>{props.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          class="btn btn-lg r-green-button form-rounded fix-width"
          onClick={props.onHide}
        >
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-lg r-red-button form-rounded fix-width"
          onClick={props.onDelete}
        >
          Yes
        </button>
      </Modal.Footer>
    </Modal>
=======
      Yes
    </button>
  );
  const buttons = [cancelButton, deleteButton];
  return (
    <GeneralDialogBox
      show={props.show}
      onHide={props.onHide}
      onDelete={props.onDelete}
      buttons={buttons}
      title="Deleting Trip"
      heading="Are you sure?"
      message="You are about to delete a trip. Are you sure you want to continue?"
    />
>>>>>>> origin/master
  );
}

export default Confirmation;
