const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateHiringInput(data) {
  let errors = {};

  data.position= !isEmpty(data.position) ? data.position: '';
  data.description = !isEmpty(data.description) ? data.description : '';

  if (Validator.isEmpty(data.position)) {
    errors.position= 'Position field is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Descriptionfield is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};