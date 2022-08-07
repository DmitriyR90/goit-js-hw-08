import throttle from 'lodash.throttle';

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
  emailArea: document.querySelector('.feedback-form input'),
  messageArea: document.querySelector('.feedback-form textarea'),
};

const STORAGE_KEY = 'feedback-form-state';

populateFeedbackFormData();
const feedbackData = {};

refs.feedbackForm.addEventListener('submit', onFormSubmit);
refs.feedbackForm.addEventListener('input', throttle(onFeedbackInput, 500));

function populateFeedbackFormData() {
  let savedFeedback = localStorage.getItem(STORAGE_KEY);
  const savedFeedbackData = JSON.parse(savedFeedback);

  if (savedFeedback) {
    const { message = '', email = '' } = savedFeedbackData;
    refs.emailArea.value = email;
    refs.messageArea.value = message;
  }
}

function onFeedbackInput(e) {
  feedbackData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackData));
}

function onFormSubmit(e) {
  e.preventDefault();
  if (refs.emailArea.value === '' || refs.messageArea.value === '') {
    alert('Заполните все строки');
  } else {
    console.log(feedbackData);
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
}
