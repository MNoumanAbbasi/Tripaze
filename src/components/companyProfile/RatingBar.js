import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const RatingBar = ({ value, name, className }) => {
  return (
    <StarRatingComponent
      name={name}
      starCount={5}
      value={value}
      editable={false}
      className={className}
      renderStarIcon={(index, value) => {
        return (
          <span>
            {' '}
            <i
              className={
                index <= value ? 'fa fa-star fa-lg' : 'fa fa-star fa-lg'
              }
            />
          </span>
        );
      }}
    />
  );
};

export default RatingBar;
