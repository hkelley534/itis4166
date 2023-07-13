const express = require('express');
const multer  = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg'
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});
const upload = multer({ storage: storage });
const controller = require('../controllers/eventController');
const {isLoggedIn, isHost} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');

const router = express.Router();

// {GET /events} send all events to the user
router.get('/', controller.index);

// {GET /events/new} send html form for creating a new story
router.get('/new', isLoggedIn, controller.new);

// {POST /events} create a new story
router.post('/', isLoggedIn, upload.single('image'), controller.create);

// {GET /events/:id} send details of story identified by id
router.get('/:id', validateId, controller.show);

// {GET /events/:id/edit} send html form for editing an existing story
router.get('/:id/edit', validateId, isLoggedIn, isHost, controller.edit);

// {PUT /events/:id} update the story identified by id
router.put('/:id', validateId, isLoggedIn, isHost, upload.single('image'), controller.update);

// {DELETE /events/:id} delete the story identified by id
router.delete('/:id', validateId, isLoggedIn, isHost, controller.delete);

module.exports = router;