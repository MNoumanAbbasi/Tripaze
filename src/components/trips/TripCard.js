// For modularity, creating a separate component for trip cards
import React from 'react';
import { Link } from 'react-router-dom';
import CardImage from '../displayImages/CardImage';
import notifi from '../../Images/notifi.png';
import LogoImage from '../displayImages/LogoImage';
import moment from 'moment';

const TripCard = ({ trip, isCompProfile }) => {
  // Displaying notification logic
  let notification = null;
  if (trip.notifications && isCompProfile) {
    notification = (
      <img
        data-cy="notification"
        src={notifi}
        alt="Notification"
        className="top-right"
      />
    );
  }

  return (
    <Link to={'/trip/' + trip.id} className="nav-link">
      <div class="card content-box m-4 change-card-width">
        <div class="trip-title">
          <CardImage img={trip.image} type="trip" />
          {/* Notification will only appear if there are unread questions and admin mode is on */}
          {notification}
          <div class="bottom-left change-font text-white darken-bg">
            {trip.title}
          </div>
        </div>

        <div class="card-body">
          {/* Logo image */}
          <h6 class="card-title change-font font-weight-bold text-uppercase">
            <LogoImage
              companyID={trip.companyId}
              className="img-fluid logo-on-card rounded-circle mr-1"
            />
            {' ' + trip.companyName}
          </h6>
          <hr></hr>
          {/* Date display */}
          <h6 className="ml-3 change-font">
            <i class="fa fa-calendar fa-fw" aria-hidden="true"></i>
            {moment(trip.departureDate.toDate()).format('MMMM Do YYYY')}
          </h6>

          {/* Trip Duration */}
          <h6 className="ml-3 change-font">
            <i class="fa fa-clock-o fa-fw" aria-hidden="true"></i>
            {trip.duration + ' days'}
          </h6>
          <hr></hr>

          {/* Departure Location and price */}
          <div>
            <ul class="list-inline d-flex justify-content-around">
              <h6 class="list-inline-item text-uppercase change-font mt-1">
                <i class="fa fa-map-marker fa-fw " aria-hidden="true"></i>
                {trip.departureLoc}
              </h6>

              {/* The code separationg for thousands is taken from: https://answers.acrobatusers.com/How-to-separate-thousands-with-space-and-adding-2-decimal-places-q282162.aspx */}
              <h6 class="list-inline-item change-color change-font text-light form-round">
                Rs.{' '}
                {trip.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </h6>
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
