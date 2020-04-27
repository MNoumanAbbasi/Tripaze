import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addReview, deleteReview } from '../../store/actions/reviewActions';

const Review = (props) => {
  let button = null;
  if (props.profileType == 'User' && props.profileID == props.userID) {
    button = (
      <button
        className="btn btn-sm bg-turq form-rounded float-right mr-3"
        onClick={() => props.removeReview(props.id)}
      >
        <i className="fa fa-times fa-2x text-danger"></i>
      </button>
    );
  }
  return (
    <div className="faq tb-border-0 mt-3 border-turq ">
      {button}
      <h6 className="username text-white bg-turq p-4">{props.userName}</h6>
      <div className="ml-3">
        {' '}
        <p>{props.rating} (rating bar)</p>
        <p className="review">{props.review}</p>
      </div>
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
    <div className="border border-thin mt-3 border-turq">
      <div className="form-group">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add Review"
            className="form-control form-control-lg"
            onChange={(event) => setReview(event.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Add rating"
            className="form-control form-control-lg mt-2"
            onChange={(event) => setRating(event.target.value)}
            required
          />
          <div className="form-row mr-3 justify-content-end">
            <button className="btn form-rounded r-green-button">Submit</button>
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
        className="btn mt-3 form-rounded red-button border-red"
        onClick={() => setIsAddReviewState(false)}
      >
        Cancel
      </button>
    );
  } else if (props.profileType !== 'User') {
    button = null;
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
