import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addFaq, deleteFaq } from '../../store/actions/faqActions';

const sampleQuestions = [
  {
    question: 'New Question?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit, nisl eu tempor mollis.',
  },
  {
    question: 'Another Question?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit, nisl eu tempor mollis  .',
  },
];

const FAQ = (props) => {
  return (
    <div className="faq">
      <button
        className="remove-btn float-right"
        onClick={() => props.removeFaq(props.question, props.answer)}
      >
        <i className="material-icons">cancel</i>
      </button>
      <p className="question">{props.question}</p>
      <p className="answer">{props.answer}</p>
    </div>
  );
};

const AddNewFAQForm = (props) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({ question, answer });
  };

  return (
    <div className="addNewFaq">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add question"
          onChange={(event) => setQuestion(event.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Add answer"
          onChange={(event) => setAnswer(event.target.value)}
          required
        />
        <button className="dark-button">Submit</button>
      </form>
    </div>
  );
};

const FAQSection = (props) => {
  // State to store all FAQs
  const [FAQs, setFAQs] = useState(sampleQuestions); // change sampleQuestions to fetch questions from db
  // State to check if the Add new FAQ form is open or not
  const [isAddFAQState, setIsAddFAQState] = useState(false);

  const addNewFaq = (newFaq) => {
    setFAQs([...FAQs, newFaq]);
    setIsAddFAQState(false);
  };
  const removeFaq = (question, answer) => {
    setFAQs(
      FAQs.filter((faq) => faq.question !== question && faq.answer !== answer)
    );
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
        return <FAQ key={faq.question} {...faq} removeFaq={removeFaq} />;
      })}
      {isAddFAQState && <AddNewFAQForm onSubmit={addNewFaq} />}
      {button}
    </div>
  );
};

export default FAQSection;
