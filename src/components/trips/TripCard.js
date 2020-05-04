// For modularity, creating a separate component for trip cards
import React from 'react';
import { Link } from 'react-router-dom';
import CardImage from '../displayImages/CardImage';
import cardbg from './card-bg.png';
import moment from 'moment';

const TripCard = ({ trip, isCompProfile }) => {
  let notification = null;
  if (trip.notifications && isCompProfile) {
    console.log('NOTIFICATION');
    notification = 'A NOTIFICATION';
  }
  return (
    <Link to={'/trip/' + trip.id} className="nav-link">
      <div class="card content-box m-4 change-card-width">
        <div class="trip-title">
          <CardImage img={trip.image} type="trip" />
          <div class="bottom-left change-font darken-bg">{trip.title}</div>
          {/* <h4 class="bottom-left change-font darken-bg">{notification}</h4> */}
        </div>

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
            {moment(trip.departureDate.toDate()).format('MMMM Do YYYY')}
          </h6>
          <h6 className="ml-3 change-font">
            <i class="fa fa-clock-o fa-fw" aria-hidden="true"></i>
            {trip.duration + ' days'}
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
