const { DateTime } = require('luxon');
const {v4: uuidv4} = require('uuid');

dt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);

const events = [
  {
    id: '1',
    title: 'My life at Charlotte',
    author: 'Hunter Kelley',
    content: 'Eveniet similique animi nam odio aspernatur repellat cum sit. Eveniet impedit ipsum eligendi. Dolore sit modi asperiores eveniet nobis corporis, voluptatum autem?', 
    createdAt: dt
  }, 
]

exports.find = () => events;

exports.findById = id => events.find(event=>event.id === id);

exports.save = event => {
  event.id = uuidv4();
  event.createdAt = dt;
  events.push(event)
}

exports.updateByID = (id, newevent) => {
  let event = events.find(event=>event.id === id);;
  if (event) {
    event.title = newevent.title
    event.content = newevent.content
    return true;
  } else {
    return false;
  }
}

exports.deleteById = id => {
  let index = events.findIndex(event => event.id === id);
  if (index === -1) {
     return false;
  }
  events.splice(index, 1);
  return true;
}