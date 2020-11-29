/* eslint-disable no-console */
const fs = require('fs');
const data = require('./data.json');

if (process.argv[2] === 'read') {
  for (const key in data.notes) {
    console.log(`${key}: ${data.notes[key]}`);
  }
} else if (process.argv[2] === 'create') {
  let last = 0;
  for (const key in data.notes) {
    if (parseInt(key) > last) {
      last = parseInt(key);
    }
  }
  data.notes[last + 1] = process.argv[3];
} else if (process.argv[2] === 'delete') {
  delete data.notes[process.argv[3].toString()];
} else if (process.argv[2] === 'update') {
  data.notes[process.argv[3]] = process.argv[4];
}

const newData = JSON.stringify(data, null, 2);
fs.writeFile('data.json', newData, err => {
  if (err) throw err;
});
