import swal from 'sweetalert';

export const alreadyReviewedModal = () => {
  swal({
    title: 'Already reviewed',
    text:
      'You have already reviewed this company. You can only review a company once.',
    buttons: true,
  });
};

export const succesfulReviewModal = () => {
  swal('Review added', 'The review has been added!', 'success');
};

export const deleteReviewModal = (props) => {
  swal({
    title: 'Are you sure?',
    text:
      'You are about to delete your review. Once deleted, you will not be able to recover this review!',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      props.removeReview(props.id);
      swal('The review has been successfully deleted!', {
        icon: 'success',
      });
    }
  });
};
