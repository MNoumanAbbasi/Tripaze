import React from 'react';

const LoadingBox = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100px' }}
    >
      <i class="fa fa-3x fa-spinner fa-spin text-turq"></i>
      <div className="m-3 home-heading">Loading</div>
    </div>
  );
};

export default LoadingBox;
