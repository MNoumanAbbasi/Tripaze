import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const RatingBarInput = ({ value, name, className }) => {
  return (
    <StarRatingComponent
      name={name}
      starCount={5}
      value={value}
      editable={true}
      className={className}
      //   onStarClick = Add function here that updates stored value
      renderStarIcon={(index, value) => {
        return (
          <span>
            {' '}
            <i
              className={
                index <= value ? 'fa fa-star fa-2x' : 'fa fa-star fa-2x'
              }
            />
          </span>
        );
      }}
    />
  );
};

export default RatingBarInput;
