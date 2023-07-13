const rateLimit = require('express-rate-limit');

exports.logInLimiter = rateLimit({
  windowMs: 60 * 1000, //1 minute time window
  max: 5,
  // message: 'Too many login rquests. Try again later'
  handler: (req, res, next)=>{
    let err = new Error('Too many login requests. Try again later');
    err.status = 429;
    return next(err);
  }
})

exports.signUpLimiter = rateLimit({
  windowMs: 60 * 1000, //1 minute time window
  max: 1,
  // message: 'Too many sign up rquests. Try again later'
  handler: (req, res, next)=>{
    let err = new Error('Too many sign up requests. Try again later');
    err.status = 429;
    return next(err);
  }
})

//          MULTIPLE SERVER IMPLEMENTATION
// 
// const mongoose = require('mongoose');
// const { RateLimiterMongo } = require('rate-limiter-flexible');

// let url = 'mongodb+srv://hkelley534:oCkeYtsNgeDM1ldy@letsread.oeig8pe.mongodb.net/?retryWrites=true&w=majority'
// let mongoConn = mongoose.connect(url)
// .then(()=>{
//   // Create log in rate limiter
//   const logInOpts = {
//     storeClient: mongoConn,
//     keyPrefix: 'logInReq',
//     points: 6, // 6 requests
//     duration: 60, // per 60 second by IP
//   };
//   const logInRateLimiter = new RateLimiterMongo(logInOpts);
//   exports.logInLimiter = (req, res, next) => {
//     logInRateLimiter.consume(req.ip)
//       .then(() => {
//         next();
//       })
//       .catch(() => {
//         let err = new Error('Too many requests');
//         err.status = 429;
//         next(err);
//       });
//   };
//   // Create sign up rate limiter
//   const signUpOpts = {
//     storeClient: mongoConn,
//     keyPrefix: 'signUpReq',
//     points: 1, // 1 request
//     duration: 60, // per 60 second by IP
//   };
//   const signUpRateLimiter = new RateLimiterMongo(signUpOpts);
//   exports.signUpLimiter = (req, res, next) => {
//     signUpRateLimiter.consume(req.ip)
//       .then(() => {
//         next();
//       })
//       .catch(() => {
//         let err = new Error('Too many requests');
//         err.status = 429;
//         next(err);
//       });
//   };
// })
// .catch(err=>next(err));


