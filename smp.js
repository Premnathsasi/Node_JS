const fs = require('fs');

const dataToAppend = 'This data will be appended to the file.';

fs.appendFile('example.txt', dataToAppend, (err) => {
  if (err) {
    console.error('Error appending to the file:', err);
  } else {
    console.log('Data appended successfully.');
  }
});