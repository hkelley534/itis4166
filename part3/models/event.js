const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  category: {type: String, required: [true, 'category is required']},
  title: {type: String, required: [true, 'title is required']},
  host: {type: String, required: [true, 'host is required']},
  details: {type: String, required: [true, 'details are required']},
  location: {type: String, required: [true, 'location is required']},
  startTime: {type: String, required: [true, 'title is required']},
  endTime: {type: String, required: [true, 'title is required']},
  image: {type: String, required: [true, 'image is required']}
})

module.exports= mongoose.model('Event', eventSchema)


