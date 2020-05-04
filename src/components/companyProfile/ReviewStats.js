import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import RatingBar from '../companyProfile/RatingBar.js';

function MyVerticallyCenteredModal(props) {
  const { avgRating, ratingStats } = props;
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
            <span class="display-4 font-weight-bolder ml-md-5 ">
              {avgRating}
            </span>
            <br />
            <span class="text-black-50 ml-md-5">out of 5</span>
            <div className="row justify-content-around ml-2">
              <RatingBar
                name="companyrating"
                value={avgRating}
                className="ml-lg-4"
              />
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
                    style={{ width: ratingStats[4] }}
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
                    style={{ width: ratingStats[3] }}
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
                    style={{ width: ratingStats[2] }}
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
                    style={{ width: ratingStats[1] }}
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
                    style={{ width: ratingStats[0] }}
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

function ReviewStats({ reviews, avgRating }) {
  const [modalShow, setModalShow] = React.useState(false);
  let ratingStats = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    ratingStats[review.rating]++;
  });
  ratingStats = ratingStats.map((rating) => {
    if (reviews.length <= 0) return 0;
    let ratingPercentage = (rating * 100) / reviews.length;
    return ratingPercentage.toString() + '%';
  });
  console.log(ratingStats);
  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        ratingStats={ratingStats}
        avgRating={avgRating}
      />
    </>
  );
}

export default ReviewStats;
