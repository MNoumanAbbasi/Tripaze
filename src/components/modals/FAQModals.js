import swal from 'sweetalert';

export const succesfulQuestionModal = () => {
  swal('Question Added', 'The question has been added!', 'success');
};

export const succesfulAnswerModal = () => {
  swal('Answer Added', 'The answer has been added!', 'success');
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
