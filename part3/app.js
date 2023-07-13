// require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const { DateTime} = require('luxon');
const mainRoutes = require('./routes/mainRoutes');
const eventRoutes = require('./routes/eventRoutes');

// create app
const app = express();
app.locals.DateTime = DateTime;

// configure app
let port = 3000;
let host = 'localhost';
let url = 'mongodb+srv://hkelley534:oCkeYtsNgeDM1ldy@project3.vslqpfo.mongodb.net/nbda-project3?retryWrites=true&w=majority'
app.set('view engine', 'ejs');

// connect to MongoDB
mongoose.connect(url)
.then(()=>{
  // start the server
  app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
  })
})
.catch(err=>next(err))

// mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// set up routes
app.use('/', mainRoutes)
app.use('/events', eventRoutes);

// error handling
app.use((req, res, next) => {
  let err = new Error('The server cannot locate ' + req.url);
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  console.log(err.stack);
  // If there is no other error throw error
  if (!err.status) {
    err.status = 500;
    err.message = ("Internal Server Error");
  }
  res.status(err.status);
  res.render('error', {error: err});
})