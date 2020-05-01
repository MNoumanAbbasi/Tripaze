import Geocode from 'react-geocode';

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
