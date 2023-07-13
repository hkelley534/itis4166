const { DateTime} = require('luxon');
const model = require('../models/event');
const Rsvp = require('../models/rsvp');
const user = require('../models/user');

// INDEX
exports.index = (req, res, next)=>{
  // find all events
  model.find()
  .then(events=>{
    // find distinct categories
    model.distinct('category')
    .then(categories=>{
      // render index page
      res.render('./event/index', {events, categories});
    })
    .catch(err=>next(err));
  })
  .catch(err=>next(err));
};

// NEW
exports.new = (req, res)=>{
  res.render('./event/new');
};

// CREATE
exports.create = (req, res, next)=>{
  let event = new model(req.body);
  event.image = '/uploads/' + req.file.filename;
  event.host = req.session.user._id;
  event.save()
  .then(()=>{
    req.flash('success', 'Event created successfully');  
    res.redirect('./events')
  })
  .catch(err=>{
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    next(err)
  });
};

// SHOW
exports.show = (req, res, next)=>{
  let id = req.params.id;

  model.findById(id).populate('host', '_id firstName lastName')
  .then(event=>{
    // if event cannot be found throw error
    if (event) {
      event.startTime = DateTime.fromISO(event.startTime).toLocaleString(DateTime.DATETIME_SHORT);
      event.endTime = DateTime.fromISO(event.endTime).toLocaleString(DateTime.DATETIME_SHORT);
      Rsvp.countDocuments({ event: id, status: "YES" })
      .then((count)=>{
        res.render('./event/show', {event, count});
      })
      .catch(err=>next(err));
    } else {
      let err = new Error('Cannot find an event with id ' + id);
      err.status = 404;
      next(err);
    }
  })
  .catch(err=>next(err));
};

// RSVP
exports.rsvp = (req, res, next)=>{
  let id = req.params.id;

  model.findById(id)
  .then(event=>{
    if (event) {
      let action = req.params.action;
      let filter = { user: req.session.user._id, event: id };
      let update = {};
      update.status = action;
      update.event = id;
      update.user = req.session.user._id;
      Rsvp.findOneAndUpdate(filter, update, {new: true, upsert: true})
      .then(()=>{
        req.flash('success', 'RSVP added successfully');  
        res.redirect('/users/profile');
      })
      .catch(err=>next(err));
    } else {
      let err = new Error('Cannot find an event with id ' + id);
      err.status = 404;
      next(err);
    }
  })
  .catch(err=>next(err));
};

// EDIT
exports.edit = (req, res, next)=>{
  let id = req.params.id;

  model.findById(id)
  .then(event=>{
    // if event cannot be found throw error
    if (event) {
      res.render('./event/edit', {event});
    } else {
      let err = new Error('Cannot find an event with id ' + id);
      err.status = 404;
      next(err);
    }
  })
  .catch(err=>next(err));
};

// UPDATE
exports.update = (req, res, next)=>{
  let id = req.params.id;
  let event = req.body;
  if(req.file) {
    event.image = '/uploads/' + req.file.filename;
  }

  model.findByIdAndUpdate(id, event, {runValidators: true})
  .then(event=>{
    if (event) {
      req.flash('success', 'Event edited successfully');  
      res.redirect('/events/' + id);
    } else {
      let err = new Error('Cannot find an event with id ' + id);
      err.status = 404;
      next(err);  
    }
  })
  .catch(err=>{
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    next(err)
  });
};

// DELETE
exports.delete = (req, res, next)=>{
  let id = req.params.id;
  model.findByIdAndDelete(id)
  .then(event=>{
    if (event) {
      Rsvp.deleteMany({ event: id })
      .then(()=>{
        req.flash('success', 'Event deleted successfully');  
        res.redirect('/events');
      })
      .catch(err=>next(err));
    } else {
      let err = new Error('Cannot find an event with id ' + id);
      err.status = 404;
      next(err);
    };
  })
  .catch(err=>next(err));
};
