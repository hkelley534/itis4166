const model = require('../models/event');

exports.index = (req, res)=>{
  let events = model.find();
  let categories = model.categories();
  data = {events, categories}
  res.render('./event/index', {data});
}

exports.new = (req, res)=>{
  res.render('./event/new');
}

exports.create = (req, res)=>{
  let event = req.body;
  model.save(event);
  res.redirect('./events');
}

exports.show = (req, res, next)=>{
  let id = req.params.id;
  let event = model.findById(id);
  // If event cannot be found throw error
  if (event) {
    res.render('./event/show', {event});
  } else {
    let err = new Error('Cannot find an event with id ' + id);
    err.status = 404;
    next(err);
  }
}

exports.edit = (req, res, next)=>{
  let id = req.params.id;
  let event = model.findById(id);
  console.log(event)
  // If event cannot be found throw error
  if (event) {
    res.render('./event/edit', {event});
  } else {
    let err = new Error('Cannot find an event with id ' + id);
    err.status = 404;
    next(err);
  }
}

exports.update = (req, res, next)=>{
  let event = req.body;
  let id = req.params.id;
  // If event cannot be updated throw error
  if (model.updateByID(id, event)) {
    res.redirect('/events/' + id);
  } else {
    let err = new Error('Cannot find an event with id ' + id);
    err.status = 404;
    next(err);  
  }
}

exports.delete = (req, res, next)=>{
  let id = req.params.id;
  // If event cannot be deleted throw error
  if (model.deleteById(id)) {
    res.redirect('/events');
  } else {
    let err = new Error('Cannot find an event with id ' + id);
    err.status = 404;
    next(err);
  }
}
