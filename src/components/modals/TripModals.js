import swal from 'sweetalert';

export const succesfulCreateTripModal = () => {
  swal('Trip Posted', 'The trip has been posted!', 'success');
};

export const confirmEditModal = (values, props) => {
  swal({
    title: 'Are you sure?',
    text: 'The edited changes will be permanent!',
    icon: 'warning',
    buttons: true,
  }).then((willEdit) => {
    if (willEdit) {
      props.editTrip(values, props.match.params.id);
      props.history.goBack();
      swal('The trip has successfully been edited!', {
        icon: 'success',
      });
    }
  });
};

export const deleteModal = (props, img) => {
  swal({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this trip!',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      props.deleteTrip(img, props.match.params.id);
      props.history.push('/');
      swal('Poof! The trip has been deleted!', {
        icon: 'success',
      });
    }
  });
};

export const cancelModal = (history) => {
  console.log('Asd');
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
