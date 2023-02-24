const { DateTime } = require('luxon');
const {v4: uuidv4} = require('uuid');
const dt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
const events = [
  {
    id: uuidv4(),
    category: "Trade is War",
    title: "Trade is War Meeting 1",
    host: "Jacob Roder",
    details: "oawnhgoaweghwoeig hweaogiwehgoaiwehg oawiegh woeghwaoegi hwaegoh awegoihw aegohawegohi",
    location: "CHHS 380",
    startTime: dt,
    endTime: dt,
    image: "/images/book.jpg",
  },
  {
    id: uuidv4(),
    category: "Interest Meeting",
    title: "Dog",
    host: 2,
    details: 2,
    location: 2,
    startTime: 2,
    endTime: 2,
    image: "/",
  },
  {
    id: uuidv4(),
    category: "Trade is War",
    title: "Trade is War Meeting 2",
    host: 3,
    details: 3,
    location: 3,
    startTime: 3,
    endTime: 3,
    image: "/images/book.jpg",
  },
  {
    id: uuidv4(),
    category: "Interest Meeting",
    title: "Cat",
    host: "John",
    details: "oawnhgoaweghwoeig hweaogiwehgoaiwehg oawiegh woeghwaoegi hwaegoh awegoihw aegohawegohi",
    location: "my house",
    startTime: "2am",
    endTime: "4am",
    image: "/",
  }
]

exports.find = () => events;

exports.findById = id => events.find(event=>event.id===id);

exports.categories = () => events.map(event => event.category).filter((value, index, self) => self.indexOf(value) === index).sort();

exports.save = event => {
  event.id = uuidv4();
  events.push(event)
}

exports.updateByID = (id, newEvent) => {
  let event = events.find(event=>event.id === id);
  if (!event) return false;
  Object.assign(event, newEvent)
  return true;
}

exports.deleteById = id => {
  let index = events.findIndex(event=>event.id === id);
  if (index === -1) return false;
  events.splice(index, 1);
  return true;
}


