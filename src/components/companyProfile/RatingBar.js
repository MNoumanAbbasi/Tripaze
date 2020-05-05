import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const RatingBar = ({ value, name, className }) => {
  return (
    <StarRatingComponent
      name={name}
      editing={false}
      starCount={5}
      value={value}
      className={className}
      emptyStarColor={'#D3D3D3'}
      renderStarIcon={(index, value) => {
        return (
          <span>
            {' '}
            <i className="fa fa-star fa-lg" />
          </span>
        );
      }}
    />
  );
};

export default RatingBar;
