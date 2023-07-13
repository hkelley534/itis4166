const { DateTime} = require('luxon');
const model = require('../models/event');
const options = [
  "Interest Meeting",
  "Trade is War",
  "Crying in H-Mart",
  "Les Misérables",
  "Other"
]
exports.index = (req, res, next)=>{
  // find all events
  model.find()
  .then(events=>{
    // find distinct categories
    model.distinct('category')
    .then(categories=>{
      // render index page
      data = {events, categories}
      res.render('./event/index', {data});
    })
    .catch(err=>next(err));
  })
  .catch(err=>next(err));
};

exports.new = (req, res)=>{
  res.render('./event/new', {options});
};

exports.create = (req, res, next)=>{
  let event = new model(req.body);

  event.save()
  .then(()=>{
    res.redirect('./events')
  })
  .catch(err=>{
    if (err.name === 'ValidationError') {
      err.status = 400;
    }
    next(err)
  });
};

exports.show = (req, res, next)=>{
  let id = req.params.id;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error('Invalid event id');
    err.status = 404;
    next(err);
  }

  model.findById(id)
  .then(event=>{
    // if event cannot be found throw error
    if (event) {
      event.startTime = DateTime.fromISO(event.startTime).toLocaleString(DateTime.DATETIME_SHORT);
      event.endTime = DateTime.fromISO(event.endTime).toLocaleString(DateTime.DATETIME_SHORT);
      res.render('./event/show', {event});
    } else {
      let err = new Error('Cannot find an event with id ' + id);
      err.status = 404;
      next(err);
    }
  })
  .catch(err=>next(err));
};

exports.edit = (req, res, next)=>{
  let id = req.params.id;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error('Invalid event id');
    err.status = 404;
    next(err);
  }

  model.findById(id)
  .then(event=>{
    // if event cannot be found throw error
    if (event) {
      data = {event, options}
      res.render('./event/edit', {data});
    } else {
      let err = new Error('Cannot find an event with id ' + id);
      err.status = 404;
      next(err);
    }
  })
  .catch(err=>next(err));
};

exports.update = (req, res, next)=>{
  let event = req.body;
  let id = req.params.id;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error('Invalid event id');
    err.status = 404;
    next(err);
  }

  model.findByIdAndUpdate(id, event, {runValidators: true})
  .then(event=>{
    if (event) {
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

exports.delete = (req, res, next)=>{
  let id = req.params.id;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error('Invalid event id');
    err.status = 404;
    next(err);
  }

  model.findByIdAndDelete(id)
  .then(event=>{
    if (event) {
      res.redirect('/events');
    } else {
      let err = new Error('Cannot find an event with id ' + id);
      err.status = 404;
      next(err);
    };
  })
  .catch(err=>next(err));
};
