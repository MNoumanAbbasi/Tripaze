import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addReview, deleteReview } from '../../store/actions/reviewActions';

const Review = (props) => {
  let button = null;
  if (props.profileType == 'User' && props.profileID == props.userID) {
    button = (
      <button
        className="remove-btn float-right"
        onClick={() => props.removeReview(props.id)}
      >
        <i className="material-icons">cancel</i>
      </button>
    );
  }
  return (
    <div className="reviewSection">
      {button}
      <h5 className="userName">{props.userName}</h5>
      <p className="review">{props.review}</p>
      <p className="rating">{props.rating}</p>
    </div>
  );
};

const AddNewReviewForm = (props) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({ review, rating });
  };

  return (
    <div className="addNewReview">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add Review"
          onChange={(event) => setReview(event.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Add rating"
          onChange={(event) => setRating(event.target.value)}
          required
        />
        <button className="dark-button">Submit</button>
      </form>
    </div>
  );
};

const ReviewSection = (props) => {
  // State to store all Reviews
  const [reviews, setReviews] = useState(props.reviews); // display reviews passed from parent
  // State to check if the Add new review form is open or not
  const [isAddReviewState, setIsAddReviewState] = useState(false);

  const addNewReview = (newReview) => {
    props.addReview(newReview, props.companyID);
    // TODO: Currently, the page needs to reload to have the changes appear on screen (see review actions)
    setIsAddReviewState(false);
  };
  const removeReview = (id) => {
    props.deleteReview(id);
  };

  // Button to display (add new or cancel) based on if add new faq form is open or not
  let button;
  if (isAddReviewState) {
    button = (
      <button
        className="cancelButton light-button"
        onClick={() => setIsAddReviewState(false)}
      >
        Cancel
      </button>
    );
  } else if (props.profileType == 'Guest') {
    button = null;
  } else {
    button = (
      <button
        className="addNewButton dark-button"
        onClick={() => setIsAddReviewState(true)}
      >
        Add Review
      </button>
    );
  }

  return (
    <div className="ReviewSection">
      <p className="heading">Review Section</p>
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
