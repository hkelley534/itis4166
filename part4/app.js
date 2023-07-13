// require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const { DateTime} = require('luxon');
const mainRoutes = require('./routes/mainRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');

// create app
const app = express();

// configure app
let port = 3000;
let host = 'localhost';
let url = 'mongodb+srv://hkelley534:oCkeYtsNgeDM1ldy@letsread.oeig8pe.mongodb.net/?retryWrites=true&w=majority'
app.set('view engine', 'ejs');

// connect to MongoDB
mongoose.connect(url)
.then(()=>{
  // start the server
  app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
  })
})
.catch(err=>next(err));

// mount middleware
app.use(
  session({
      secret: "q3nc6tkw07p5dnc1amf7n53wi5wz7gr4o",
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({mongoUrl: url}),
      cookie: {maxAge: 60*60*1000}
      })
);
app.use(flash());

app.use((req, res, next) => {
  // console.log(req.session);
  res.locals.user = req.session.user;
  res.locals.errorMessages = req.flash('error');
  res.locals.successMessages = req.flash('success');
  res.locals.DateTime = DateTime;
  res.locals.categories = [
    "Interest Meeting",
    "Trade is War",
    "Crying in H-Mart",
    "Les Misérables",
    "Other"
  ];
  next();
});

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// set up routes
app.use('/', mainRoutes)
app.use('/events', eventRoutes);
app.use('/users', userRoutes);

// error handling
app.use((req, res, next) => {
  let err = new Error('The server cannot locate ' + req.url);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  // If there is no other error throw error
  if (!err.status) {
    err.status = 500;
    err.message = ("Internal Server Error");
  }
  res.status(err.status);
  res.render('error', {error: err});
});