// require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { DateTime} = require('luxon');
const mainRoutes = require('./routes/mainRoutes');
const eventRoutes = require('./routes/eventRoutes');

// create app
const app = express();

// configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');
app.locals.DateTime = DateTime;
app.locals.options = [
  "Interest Meeting",
  "Trade is War",
  "Crying in H-Mart",
  "Les Misérables",
  "Other"
]

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

// start the server
app.listen(port, host, ()=>{
  console.log('Server is running on port', port);
})