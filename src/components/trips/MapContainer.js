import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Geocode from 'react-geocode';

const mapStyles = {
  width: '50%',
  height: '50%',
};

// setting pakistan's geographical limits
const countryLimits = {
  north: 37.5,
  south: 24.0,
  west: 61.0,
  east: 75.5,
};

Geocode.setApiKey('AIzaSyAdrE2IZMrS6t9XpbPNN5gbHNwaGt2biNs');
Geocode.setLanguage('en');
Geocode.setRegion('pk');

// Enable or disable logs. Its optional.
Geocode.enableDebug();

const MapContainer = (props) => {
  const [coordinates, setCoordinates] = useState([]);

  const getCoordinates = () => {
    return Promise.all(
      props.destinations.map((dest) => {
        return new Promise((resolve) => {
          Geocode.fromAddress(dest).then(
            (response) => {
              const coord = response.results[0].geometry.location;
              resolve(coord);
            },
            (error) => {
              console.error(error);
            }
          );
        });
      })
    );
  };

  const isInCountry = ({ lat, lng }, limits) => {
    return (
      lat >= limits.south &&
      lat <= limits.north &&
      lng >= limits.west &&
      lng <= limits.east
    );
  };

  const placeMarkers = () => {
    return coordinates.map((coord, index) => {
      if (isInCountry(coord, countryLimits)) {
        return (
          <Marker
            key={index}
            id={index}
            position={{
              lat: coord.lat,
              lng: coord.lng,
            }}
          />
        );
      }
    });
  };

  useEffect(() => {
    getCoordinates().then((coords) => {
      setCoordinates(coords);
    });
  }, []);

  return (
    <Map
      google={props.google}
      zoom={5}
      style={mapStyles}
      initialCenter={{
        lat: 30.4,
        lng: 69.5,
      }}
    >
      {placeMarkers()}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAdrE2IZMrS6t9XpbPNN5gbHNwaGt2biNs',
})(MapContainer);
