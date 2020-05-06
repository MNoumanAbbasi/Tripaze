import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  addQuestion,
  addAnswer,
  deleteFaq,
} from '../../store/actions/faqActions';
import SignInToAccess from '../modals/SignInToAccess';
import {
  deleteFAQModal,
  succesfulQuestionModal,
  succesfulAnswerModal,
} from '../modals/FAQModals';

const FAQ = (props) => {
  const isOwnCompanyProfile = props.profileType === 'Company';
  const showAddAnswerForm = isOwnCompanyProfile && props.answer === '';
  return (
    <div className="faq tb-border-0 mt-3 border-turq ">
      {isOwnCompanyProfile && (
        <button
          className="btn btn-sm bg-turq form-rounded float-right"
          onClick={() => deleteFAQModal(props)}
        >
          <i
            class="fa fa-times-circle fa-resize"
            style={{ color: '#ffff' }}
          ></i>
        </button>
      )}
      <h6 className="question bg-turq text-white p-2">Q. {props.question}</h6>
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
    // console.log('asd', question);
    event.preventDefault();
    props.onSubmit(question);
    succesfulQuestionModal();
  };

  return (
    <div className="">
      <div className="form-group border">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add question"
            className="form-control form-control-lg"
            onChange={(event) => setQuestion(event.target.value)}
            maxLength={200}
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
          <button className="btn form-rounded r-green-button">Add</button>
        </div>
      </form>
    </div>
  );
};

const FAQSection = (props) => {
  // State to store all FAQs
  const [FAQs, setFAQs] = useState(props.FAQs);
  useEffect(() => {
    setFAQs(props.FAQs);
  }, [props.FAQs]);
  // State to check if the Add new question form is open or not
  const [isAddQuestionState, setIsAddQuestionState] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const addQuestion = (question) => {
    // setFAQs([...FAQs, { question, answer: '' }]); // TODO: instead of updating local copy too. remount when faq added/deleted.
    props.addQuestion(question, props.tripID, props.profileType);
    setIsAddQuestionState(false);
  };

  const addAnswer = (answer, faqID) => {
    props.addAnswer(answer, faqID);
    setIsAddQuestionState(false);
    succesfulAnswerModal();
  };
  const removeFaq = (faqID) => {
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
  } else if (props.profileType === 'Guest') {
    button = (
      <button
        className="btn mt-3 form-rounded r-green-button"
        onClick={() => setModalShow(true)}
      >
        Add Question
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
      <SignInToAccess
        show={modalShow}
        onHide={() => setModalShow(false)}
        section="question"
      />
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
      {button}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addQuestion: (question, tripID, userType) =>
      dispatch(addQuestion(question, tripID, userType)),
    addAnswer: (answer, faqID) => dispatch(addAnswer(answer, faqID)),
    deleteFaq: (faqID) => dispatch(deleteFaq(faqID)),
  };
};

export default connect(null, mapDispatchToProps)(FAQSection);
