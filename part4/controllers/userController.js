const model = require('../models/user');
const Event = require('../models/event');

exports.new = (req, res)=>{
  res.render('./user/new');
};

exports.create = (req, res, next)=>{
  let user = new model(req.body);
  user.save()
  .then(user=>{
    if(user) {
      req.flash('success', 'Account successfully created');  
      res.redirect('/users/login');
    } 
  })
  .catch(err=>{
    if(err.name === 'ValidationError' ) {
      req.flash('error', err.message);  
      res.redirect('/users/new');
    } else if(err.code === 11000) {
      req.flash('error', 'Email has already been used');  
      res.redirect('/users/new');
    } else {
      next(err);
    }
  }); 
};

exports.getLogin = (req, res, next) => {
  res.render('./user/login');    
};

exports.login = (req, res, next)=>{
  let email = req.body.email;
  let password = req.body.password;
  model.findOne({ email: email })
  .then(user => {
    if (!user) {
      req.flash('error', 'Wrong email address');  
      res.redirect('/users/login');
    } else {
      user.comparePassword(password)
      .then(result=>{
        if(result) {
          req.session.user = user;
          req.flash('success', 'You have successfully logged in');
          res.redirect('/users/profile');
        } else {
          req.flash('error', 'Wrong password');      
          res.redirect('/users/login');
        }
      });     
    }     
  })
  .catch(err => next(err));
};

exports.profile = (req, res, next)=>{
  let id = req.session.user;
  Promise.all([model.findById(id), Event.find({host: id})]) 
  .then(results=>{
      const [user, events] = results;
      res.render('./user/profile', {user, events})
  })
  .catch(err=>next(err));
};

exports.logout = (req, res, next)=>{
  req.session.destroy(err=>{
    if(err) 
      return next(err);
    else
      res.redirect('/');  
  });
};