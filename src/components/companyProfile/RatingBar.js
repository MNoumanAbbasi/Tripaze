import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const RatingBar = ({ value, editable, name, classname }) => {
  return (
    <StarRatingComponent
      name={name}
      starCount={5}
      defaultValue={0}
      min={0}
      max={5}
      step={1}
      value={value}
      editable={editable}
      classname={classname}
    />
  );
};

export default RatingBar;
