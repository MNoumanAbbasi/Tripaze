import swal from 'sweetalert';

export const confirmEditModal = (values, props) => {
  swal({
    title: 'Are you sure?',
    text: 'The edited changes will be permanent!',
    icon: 'warning',
    buttons: true,
  }).then((willEdit) => {
    if (willEdit) {
      props.editProfile(values, props.match.params.id);
      props.history.goBack();
      swal('The profile has successfully been edited!', {
        icon: 'success',
      });
    }
  });
};

export const verifyEmail = () => {
  swal({
    title: 'Verify Account',
    text: 'You need to verify your email to be able to create trips',
    buttons: true,
  });
};
