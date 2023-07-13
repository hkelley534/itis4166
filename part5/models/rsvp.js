const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
  status: {
    type: String,
    enum: ['YES', 'MAYBE', 'NO'], 
    required: [true, 'status is required']
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'event is required']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: [true, 'user is required'], 
  },
});

module.exports = mongoose.model('Rsvp', rsvpSchema);