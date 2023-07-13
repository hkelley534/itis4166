const { DateTime } = require('luxon');
const {v4: uuidv4} = require('uuid');
const dt = DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm");
const events = [
  {
    id: uuidv4(),
    category: "Trade is War",
    title: "Trade is War Part 1",
    host: "Jacob Roder",
    details: 'Meet at CHHS 380 to read the first part of "Trade is War"',
    location: "CHHS 380",
    startTime: dt,
    endTime: dt ,
    image: "/images/trade.jpg",
  },
  {
    id: uuidv4(),
    category: "Interest Meeting",
    title: "Les Misérables",
    host: "Caroline Perdue",
    details: 'Meet at McEniry 123 to learn about the background and history of "Les Misérables"',
    location: "McEniry 123",
    startTime: dt,
    endTime: dt,
    image: "/images/miserables.jpg",
  },
  {
    id: uuidv4(),
    category: "Trade is War",
    title: "Trade is War Part 2",
    host: "Jacob Roder",
    details: 'Meet at CHHS 376 to read and discuss the second part of "Trade is War"',
    location: "CHHS 376",
    startTime: dt,
    endTime: dt,
    image: "/images/trade.jpg",
  },
  {
    id: uuidv4(),
    category: "Interest Meeting",
    title: "Slaughterhouse 5",
    host: "Mason Cline",
    details: 'Meet at CHHS 376 to learn about "Slaughterhouse 5", its author, and its inspiration',
    location: "CHHS 376",
    startTime: dt,
    endTime: dt,
    image: "/images/slaughterhouse.jpg",
  },
  {
    id: uuidv4(),
    category: "Interest Meeting",
    title: "Crying in H-Mart",
    host: "Jennifer Nguy",
    details: 'Meet at McEniry 124 to learn about "Crying in H-Mart" and its author',
    location: "McEniry 124",
    startTime: dt,
    endTime: dt,
    image: "/images/h-mart.jpg",
  },
  {
    id: uuidv4(),
    category: "Trade is War",
    title: "Trade is War Part 3",
    host: "Jacob Roder",
    details: 'Meet at CHHS 380 to read and discuss the third part of "Trade is War"',
    location: "CHHS 380",
    startTime: dt,
    endTime: dt,
    image: "/images/trade.jpg",
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


