import Modal from 'react-bootstrap/Modal';
import React from 'react';

// Reusable bootstrap dialog box
function GeneralDialogBox(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.message}</p>
      </Modal.Body>
      <Modal.Footer>
        {props.buttons.map((button) => {
          return button;
        })}
      </Modal.Footer>
    </Modal>
  );
}

export default GeneralDialogBox;
