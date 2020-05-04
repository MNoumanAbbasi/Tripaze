import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import RatingBar from '../companyProfile/RatingBar.js';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Ratings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div class="d-flex">
          <div class="text-center">
            <span class="display-4 font-weight-bolder ml-md-5 ">3.1</span>
            <br />
            <span class="text-black-50 ml-md-5">out of 5</span>
            <div className="row justify-content-around ml-2">
              <RatingBar name="companyrating" value={2} className="ml-lg-4" />
              <p className="ml-2">
                {' '}
                <i class="fa fa-user" aria-hidden="true"></i> {' ' + '5'}{' '}
                Reviews
              </p>
            </div>
          </div>
          <div class="flex-grow-1">
            <div class="row align-items-center">
              <div class="col-4 text-right">
                <i aria-hidden="true" class="fa fa-star"></i>
                {' ' + '5'}
              </div>
              <div class="col-8">
                <div class="progress" style={{ height: '15px' }}>
                  <div
                    class="progress-bar progbar1"
                    role="progressbar"
                    style={{ width: '90%' }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
            <div class="row align-items-center">
              <div class="col-4 text-right">
                <i aria-hidden="true" class="fa fa-star"></i>
                {' ' + '4'}
              </div>
              <div class="col-8">
                <div class="progress" style={{ height: '15px' }}>
                  <div
                    class="progress-bar progbar2"
                    role="progressbar"
                    style={{ width: '75%' }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
            <div class="row align-items-center">
              <div class="col-4 text-right">
                <i aria-hidden="true" class="fa fa-star"></i>
                {' ' + '3'}
              </div>
              <div class="col-8">
                <div class="progress" style={{ height: '15px' }}>
                  <div
                    class="progress-bar progbar3"
                    role="progressbar"
                    style={{ width: '50%' }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
            <div class="row align-items-center">
              <div class="col-4 text-right">
                <i aria-hidden="true" class="fa fa-star"></i>
                {' ' + '2'}
              </div>
              <div class="col-8">
                <div class="progress" style={{ height: '15px' }}>
                  <div
                    class="progress-bar progbar4"
                    role="progressbar"
                    style={{ width: '25%' }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
            <div class="row align-items-center">
              <div class="col-4 text-right">
                <i aria-hidden="true" class="fa fa-star"></i>
                {' ' + '1'}
              </div>
              <div class="col-8">
                <div class="progress" style={{ height: '15px' }}>
                  <div
                    class="progress-bar progbar5"
                    role="progressbar"
                    style={{ width: '15%' }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function ReviewStats() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default ReviewStats;
