import swal from 'sweetalert';

export const errorsModal = (err) => {
  swal({
    title: 'Errors on fields',
    text: 'Sorry, some fields have errors. Please check your input again.',
    icon: 'warning',
    buttons: true,
  });
};

export const cancelModal = (history) => {
  swal({
    title: 'Leave page?',
    text: 'Changes you made may not be saved.',
    icon: 'warning',
    buttons: ['Cancel', 'Leave'],
  }).then((willLeave) => {
    if (willLeave) {
      history.goBack();
    }
  });
};

export const NoTripsFound = (history) => {
  swal({
    title: 'No Trips found',
    text:
      'Sorry, no trips were found with the given search/filters. Please try a different serarch.',
    buttons: ['Cancel', 'Go Back'],
  }).then((willLeave) => {
    if (willLeave) {
      history.push('/');
    }
  });
};
