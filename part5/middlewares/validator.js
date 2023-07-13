const {body, validationResult} = require('express-validator');
const { DateTime } = require('luxon');

exports.validateId = (req, res, next) => {
  let id = req.params.id;
  if(!id.match(/^[0-9a-fA-F]{24}$/)) {
      let err = new Error('Invalid event id');
      err.status = 400;
      return next(err);
  }
  return next();
}

exports.validateSignUp = [
  body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
  body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
  body('email', 'Must be a valid email address').isEmail().trim().escape().normalizeEmail(),
  body('password', 'Password must be between 8-64 characters').isLength({min: 8, max: 64})
];

exports.validateLogIn = [
  body('email', 'Must be a valid email address').isEmail().trim().escape().normalizeEmail(),
  body('password', 'Password must be between 8 and 64 characters').isLength({min: 8, max: 64})
];

exports.validateEvent = [
  body('category').notEmpty().trim().escape().isIn([
    'Interest Meeting',
    'Trade is War',
    'Crying in H-Mart',
    'Les Misérables',
    'Other'
  ]),
  body('title', 'Title cannot be empty').notEmpty().trim().escape(),
  body('host').notEmpty().trim().escape(),
  body('details', 'Content must be at least 10 characters').notEmpty().isLength({min: 10}).trim().escape(),
  body('location').notEmpty().trim().escape(),
  body('startTime').notEmpty().isAfter().isISO8601().trim().escape(),
  body('endTime').notEmpty().isAfter().isISO8601().trim().escape(),
]

exports.validateRSVP = [
  body('status').notEmpty().trim().escape().isIn([
    'YES',
    'MAYBE',
    'NO'
  ]),
  body('user').notEmpty().trim().escape(),
  body('event').notEmpty().trim().escape(),
]

exports.validateResult = (req, res, next) => {
  let errors = validationResult(req);
  if(!errors.isEmpty()){
      errors.array().forEach(error=>{
          req.flash('error', error.msg);
      })
      return res.redirect('back');
  } else {
      return next();
  }
};
