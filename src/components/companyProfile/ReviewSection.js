import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addReview, deleteReview } from '../../store/actions/reviewActions';
import SignInToAccess from '../modals/SignInToAccess';
import RatingBar from './RatingBar.js';
import RatingBarInput from './RatingBarInput.js';
import moment from 'moment';
import {
  alreadyReviewedModal,
  deleteReviewModal,
  succesfulReviewModal,
} from '../modals/ReviewModals';

const Review = (props) => {
  let button = null;
  // if user is of type User not Company
  if (props.profileType === 'User' && props.profileID === props.userID) {
    button = (
      <button
        className="btn btn-sm bg-turq form-rounded float-right"
        onClick={() => deleteReviewModal(props)}
      >
        <i
          className="fa fa-times-circle fa-resize"
          style={{ color: '#ffff' }}
        ></i>
      </button>
    );
  }
  return (
    <div className="faq tb-border-0 mt-3 border-turq ">
      {button}
      <h6 className="username text-white bg-turq p-2">{props.userName}</h6>
      <div className="ml-3">
        {' '}
        <RatingBar name="companyrating" value={props.rating} editing={false} />
        <h6 className="review text-secondary">{props.review}</h6>
        <p className="review text-secondary">
          Added on:
          {' ' + moment(props.timestamp.toDate()).format('MMMM Do YYYY')}
        </p>
      </div>
    </div>
  );
};

const AddNewReviewForm = (props) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);
  const handleSubmit = (event) => {
    event.preventDefault();
    // Upload rating and review to database
    props.onSubmit({ review, rating });
  };

  return (
    <div className="border border-thin mt-3 border-turq">
      <div className="form-group">
        <form onSubmit={handleSubmit}>
          <RatingBarInput
            name="companyrating"
            onChange={(rating) => setRating(rating)}
            required
          />
          <input
            type="text"
            placeholder="Add Review"
            className="form-control form-control-lg"
            onChange={(event) => setReview(event.target.value)}
            maxLength={400}
            required
          />
          <p></p>
          <p className="review">{+review === '' ? 0 : review.length}/400</p>
          <div className="form-row mr-3 justify-content-end">
            <button className="btn form-rounded r-green-button">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ReviewSection = (props) => {
  // State to store all Reviews
  const [reviews, setReviews] = useState(props.reviews); // display reviews passed from parent
  // State to check if the Add new review form is open or not
  const [isAddReviewState, setIsAddReviewState] = useState(false);

  // To update page on any change to reviews
  useEffect(() => {
    setReviews(props.reviews);
  }, [props.reviews]);

  // Adds review to review section and store in database
  const addNewReview = (newReview) => {
    props.addReview(newReview, props.companyID);
    setIsAddReviewState(false);
    succesfulReviewModal();
  };

  // Remove review in review section and delete in database
  const removeReview = (id) => {
    props.deleteReview(id);
  };

  const [modalShow, setModalShow] = React.useState(false);
  // Users should be allowed to post only one review
  const alreadyReviewed = reviews.some((review) => review.userID === props.id);

  // Button to display (add new or cancel) based on if add new faq form is open or not
  let button;
  if (isAddReviewState) {
    button = (
      <button
        className="btn mt-3 form-rounded red-button border-red"
        onClick={() => setIsAddReviewState(false)}
      >
        Cancel
      </button>
    );
  } else if (props.profileType === 'Guest') {
    button = (
      <button
        className="btn mt-3 form-rounded r-green-button"
        onClick={() => setModalShow(true)}
      >
        Add Review
      </button>
    );
  } else if (props.profileType !== 'User') {
    button = null;
  } else if (alreadyReviewed) {
    button = (
      <button
        className="btn mt-3 form-rounded r-green-button"
        onClick={() => alreadyReviewedModal()}
      >
        Add Review
      </button>
    );
  } else {
    button = (
      <button
        className="btn mt-3 form-rounded r-green-button"
        onClick={() => setIsAddReviewState(true)}
      >
        Add Review
      </button>
    );
  }

  return (
    <div className="ReviewSection pb-5 pr-5 pl-5">
      <SignInToAccess
        show={modalShow}
        onHide={() => setModalShow(false)}
        section="review"
      />
      {reviews.map((currReview) => {
        return (
          <Review
            key={currReview.id}
            {...currReview}
            removeReview={removeReview}
            profileType={props.profileType}
            profileID={props.id}
          />
        );
      })}
      {isAddReviewState && <AddNewReviewForm onSubmit={addNewReview} />}
      {button}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    // so when we call props.createTrip, it's gonna perform a dispatch using the asynch middleware createTrip in src/store/actions
    addReview: (review, companyID) => dispatch(addReview(review, companyID)),
    deleteReview: (reviewID) => dispatch(deleteReview(reviewID)),
  };
};

export default connect(null, mapDispatchToProps)(ReviewSection);
