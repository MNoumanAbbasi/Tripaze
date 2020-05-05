import swal from 'sweetalert';

export const succesfulFAQModal = () => {
  swal('Question Posted', 'The question has been posted!', 'success');
};

export const deleteFAQModal = (props) => {
  swal({
    title: 'Are you sure?',
    text:
      'You are about to delete this question. Once deleted, you will not be able to recover this question!',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      props.removeFaq(props.id);
      swal('The question has been successfully deleted!', {
        icon: 'success',
      });
    }
  });
};
