import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addQuestion, deleteFaq } from '../../store/actions/faqActions';

const FAQ = (props) => {
  return (
    <div className="faq">
      <button
        className="remove-btn float-right"
        onClick={() => props.removeFaq(props.id)}
      >
        <i className="material-icons">cancel</i>
      </button>
      <p className="question">{props.question}</p>
      <p className="answer">{props.answer}</p>
    </div>
  );
};

const AddQuestionForm = (props) => {
  const [question, setQuestion] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(question);
  };

  return (
    <div className="addQuestion">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add question"
          onChange={(event) => setQuestion(event.target.value)}
          required
        />
        {/* <input
          type="text"
          placeholder="Add answer"
          onChange={(event) => setAnswer(event.target.value)}
          required
        /> */}
        <button className="dark-button">Submit</button>
      </form>
    </div>
  );
};

const FAQSection = (props) => {
  // State to store all FAQs
  const [FAQs, setFAQs] = useState(props.FAQs);
  // Updating FAQs from database
  if (props.FAQs === undefined) setFAQs([]);

  // State to check if the Add new FAQ form is open or not
  const [isAddFAQState, setIsAddFAQState] = useState(false);

  const addQuestion = (question) => {
    setFAQs([...FAQs, { question, answer: '' }]);
    props.addQuestion({ question, answer: '' }, props.tripID);
    setIsAddFAQState(false);
  };
  const removeFaq = (faqID) => {
    setFAQs(FAQs.filter((faq) => faq.id !== faqID));
    props.deleteFaq(faqID);
  };

  // Button to display (add new or cancel) based on if add new faq form is open or not
  let button;
  if (isAddFAQState) {
    button = (
      <button
        className="cancelButton light-button"
        onClick={() => setIsAddFAQState(false)}
      >
        Cancel
      </button>
    );
  } else {
    button = (
      <button
        className="addNewButton dark-button"
        onClick={() => setIsAddFAQState(true)}
      >
        Add Question
      </button>
    );
  }

  return (
    <div className="FAQSection">
      <p className="heading">FAQ Section</p>
      {FAQs.map((faq) => {
        return <FAQ key={faq.id} {...faq} removeFaq={removeFaq} />;
      })}
      {isAddFAQState && <AddQuestionForm onSubmit={addQuestion} />}
      {button}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addQuestion: (question, tripID) => dispatch(addQuestion(question, tripID)),
    deleteFaq: (faqID) => dispatch(deleteFaq(faqID)),
  };
};

export default connect(null, mapDispatchToProps)(FAQSection);
