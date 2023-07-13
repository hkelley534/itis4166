const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  category: {
    type: String,
    enum: ['Interest Meeting', 'Trade is War', 'Crying in H-Mart', 'Les Misérables', 'Other'],
    required: [true, 'category is required']
  },
  title: {
    type: String, 
    required: [true, 'title is required']
  },
  host: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, 'host is required']
  },
  details: {
    type: String, 
    required: [true, 'details are required']
  },
  location: {
    type: String, 
    required: [true, 'location is required']
  },
  startTime: {
    type: String, 
    required: [true, 'startTime is required']
  },
  endTime: {
    type: String, 
    required: [true, 'endTime is required']
  },
  image: {
    type: String, 
    required: [true, 'image is required']
  }
});

module.exports= mongoose.model('Event', eventSchema);


