// For modularity, creating a separate component for trip cards

import React from 'react';
import { Link } from 'react-router-dom';
import cardbg from './card-bg.png';

const TripCard = ({ trip }) => {
  return (
    <Link to={'/trip/' + trip.id}>
      <div class="card content-box mx-4 mt-5 change-card-width">
        <img class="card-img-top " src={cardbg} alt="" />
        <div class="card-body">
          <h6 class="card-title change-font font-weight-bold text-uppercase">
            <img
              src={cardbg}
              alt=""
              class="img-fluid logo-on-card rounded-circle mr-1"
            />
            {' ' + trip.companyName}
          </h6>
          <hr></hr>
          <h6 className="ml-3 change-font">
            <i class="fa fa-calendar fa-fw" aria-hidden="true"></i>
            {trip.departureDate}
          </h6>
          <h6 className="ml-3 change-font">
            <i class="fa fa-clock-o fa-fw" aria-hidden="true"></i>
            {trip.duration}
          </h6>
          <hr></hr>
          <div>
            <ul class="list-inline d-flex justify-content-around">
              <h6 class="list-inline-item text-uppercase change-font mt-1">
                <i class="fa fa-map-marker fa-fw " aria-hidden="true"></i>
                {trip.departureLoc}
              </h6>
              <h6 class="list-inline-item change-color change-font text-light form-round">
                Rs. {trip.price}
              </h6>
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
