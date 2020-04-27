import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  addQuestion,
  addAnswer,
  deleteFaq,
} from '../../store/actions/faqActions';

const FAQ = (props) => {
  const isOwnCompanyProfile = props.profileType === 'Company';
  const showAddAnswerForm = isOwnCompanyProfile && props.answer === '';
  return (
    <div className="faq tb-border-0 mt-3 border-turq ">
      {isOwnCompanyProfile && (
        <button
          className="btn btn-sm bg-turq form-rounded float-right m-2"
          onClick={() => props.removeFaq(props.id)}
        >
          <i class="fa fa-times fa-2x text-danger"></i>
        </button>
      )}
      <h6 className="question bg-turq text-white p-3">Q. {props.question}</h6>
      <div className="ml-3">
        {showAddAnswerForm && (
          <AddAnswerForm onSubmit={props.addAnswer} faqID={props.id} />
        )}
        {props.answer && <p className="answer">A. {props.answer}</p>}
      </div>
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
    <div className="border border-thin mt-3 border-turq">
      <div className="form-group">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add question"
            className="form-control form-control-lg"
            onChange={(event) => setQuestion(event.target.value)}
            required
          />
          <div className="form-row mr-3 justify-content-end">
            <button className="btn  form-rounded r-green-button">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AddAnswerForm = (props) => {
  const [answer, setAnswer] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(answer, props.faqID);
  };

  return (
    <div className="form-group">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add Answer"
          className="form-control form-control-lg"
          onChange={(event) => setAnswer(event.target.value)}
          required
        />
        <div className="form-row mr-3 justify-content-end">
          <button className="btn form-rounded r-green-button">Post</button>
        </div>
      </form>
    </div>
  );
};

const FAQSection = (props) => {
  // State to store all FAQs
  const [FAQs, setFAQs] = useState(props.FAQs);
  // State to check if the Add new question form is open or not
  const [isAddQuestionState, setIsAddQuestionState] = useState(false);
  const userSignedIn = props.profileType !== 'Guest';

  const addQuestion = (question) => {
    // setFAQs([...FAQs, { question, answer: '' }]); // TODO: instead of updating local copy too. remount when faq added/deleted.
    props.addQuestion(question, props.tripID);
    setIsAddQuestionState(false);
  };
  const addAnswer = (answer, faqID) => {
    const ind = FAQs.findIndex((faq) => faq.id === faqID);
    FAQs[ind].answer = answer;
    // setFAQs(newFAQs); // TODO: instead of updating local copy too. remount when faq added/deleted.
    props.addAnswer(answer, faqID);
    setIsAddQuestionState(false);
  };
  const removeFaq = (faqID) => {
    setFAQs(FAQs.filter((faq) => faq.id !== faqID));
    props.deleteFaq(faqID);
  };

  // Button to display (add new or cancel) based on if add new faq form is open or not
  let button;
  if (isAddQuestionState) {
    button = (
      <button
        className="btn mt-3 form-rounded red-button border-red"
        onClick={() => setIsAddQuestionState(false)}
      >
        Cancel
      </button>
    );
  } else {
    button = (
      <button
        className="btn mt-3 form-rounded r-green-button"
        onClick={() => setIsAddQuestionState(true)}
      >
        Add Question
      </button>
    );
  }

  return (
    <div className="FAQSection pb-5 pr-5 pl-5">
      {FAQs &&
        FAQs.map((faq) => {
          return (
            <FAQ
              key={faq.id}
              {...faq}
              removeFaq={removeFaq}
              addAnswer={addAnswer}
              profileType={props.profileType}
              profileID={props.profileID}
            />
          );
        })}
      {isAddQuestionState && <AddQuestionForm onSubmit={addQuestion} />}
      {userSignedIn && button}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addQuestion: (question, tripID) => dispatch(addQuestion(question, tripID)),
    addAnswer: (answer, faqID) => dispatch(addAnswer(answer, faqID)),
    deleteFaq: (faqID) => dispatch(deleteFaq(faqID)),
  };
};

export default connect(null, mapDispatchToProps)(FAQSection);
