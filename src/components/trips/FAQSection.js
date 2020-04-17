import React, { useState } from 'react';

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
<<<<<<< HEAD
      <button
        className="remove-btn float-right"
        onClick={() => props.removeFaq(props.question, props.answer)}
      >
        <i className="material-icons">cancel</i>
      </button>
=======
>>>>>>> Added FAQSection
      <p className="question">{props.question}</p>
      <p className="answer">{props.answer}</p>
    </div>
  );
};

const AddNewFAQForm = (props) => {
<<<<<<< HEAD
=======
  const [dest, setDest] = useState('')
>>>>>>> Added FAQSection
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
<<<<<<< HEAD
        <button className="dark-button">Submit</button>
=======
        <button>Submit</button>
>>>>>>> Added FAQSection
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
<<<<<<< HEAD
  const removeFaq = (question, answer) => {
    setFAQs(
      FAQs.filter((faq) => faq.question !== question && faq.answer !== answer)
    );
  };
=======
>>>>>>> Added FAQSection

  // Button to display (add new or cancel) based on if add new faq form is open or not
  let button;
  if (isAddFAQState) {
    button = (
<<<<<<< HEAD
      <button
        className="cancelButton light-button"
        onClick={() => setIsAddFAQState(false)}
      >
=======
      <button className="cancelButton" onClick={() => setIsAddFAQState(false)}>
>>>>>>> Added FAQSection
        Cancel
      </button>
    );
  } else {
    button = (
<<<<<<< HEAD
      <button
        className="addNewButton dark-button"
        onClick={() => setIsAddFAQState(true)}
      >
=======
      <button className="addNewButton" onClick={() => setIsAddFAQState(true)}>
>>>>>>> Added FAQSection
        Add Question
      </button>
    );
  }

  return (
    <div className="FAQSection">
      <p className="heading">FAQ Section</p>
      {FAQs.map((faq) => {
<<<<<<< HEAD
        return <FAQ key={faq.question} {...faq} removeFaq={removeFaq} />;
=======
        return <FAQ key={faq.question} {...faq} />;
>>>>>>> Added FAQSection
      })}
      {isAddFAQState && <AddNewFAQForm onSubmit={addNewFaq} />}
      {button}
    </div>
  );
};

export default FAQSection;
