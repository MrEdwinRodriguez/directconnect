const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBusinessInput(data) {
  let errors = {};

  data.name= !isEmpty(data.name) ? data.name: '';
  data.title = !isEmpty(data.title) ? data.title : '';

  if (Validator.isEmpty(data.name)) {
    errors.name= 'Name field is required';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};