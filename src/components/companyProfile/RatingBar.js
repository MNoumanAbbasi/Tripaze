import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const RatingBar = ({ value, name, className, editing }) => {
  return (
    <StarRatingComponent
      name={name}
      editing={editing}
      starCount={5}
      value={value}
      className={className}
      emptyStarColor={'#D3D3D3'}
      renderStarIcon={() => {
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
