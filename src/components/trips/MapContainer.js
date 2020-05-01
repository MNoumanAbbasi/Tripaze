import React, { Component, useState } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import Geocode from 'react-geocode';

const mapStyles = {
  width: '50%',
  height: '50%',
};
Geocode.setApiKey('AIzaSyAdrE2IZMrS6t9XpbPNN5gbHNwaGt2biNs');

Geocode.setLanguage('en');

Geocode.setRegion('pk');

// Enable or disable logs. Its optional.
Geocode.enableDebug();

Geocode.fromAddress('Eiffel Tower').then(
  (response) => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
  },
  (error) => {
    console.error(error);
  }
);

const MapContainer = () => {
  const [coordinates, setCoordinates] = useState([]);
  const getCoordinates = (location) => {
    Geocode.fromAddress(location).then(
      (response) => {
        const coords = response.results[0].geometry.location;
        setCoordinates([]);
        // console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <Map
      google={this.props.google}
      zoom={14}
      style={mapStyles}
      initialCenter={{
        lat: 31.5204,
        lng: 74.3587,
      }}
    />
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAdrE2IZMrS6t9XpbPNN5gbHNwaGt2biNs',
})(MapContainer);

// export default MapContainer;
