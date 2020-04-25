import React from 'react';

const LoadingBox = () => {
  return (
    <div className="row full-height-width">
      <div className=" col form-margin" style={{ height: '100px' }}>
        <div className="d-flex justify-content-center align-items-center ml-3">
          <i class="fa fa-3x fa-spinner fa-spin text-turq"></i>
          <div className="m-3 home-heading">Loading</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBox;
