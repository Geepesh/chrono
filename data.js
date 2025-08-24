// data.js

// data.js
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data.json');

function loadData() {
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath);
    return JSON.parse(raw);
  } else {
    return { startTime: null, elapsed: 0, laps: [] };
  }
}

function saveData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

let data = loadData();

module.exports = {
  get: () => data,
  save: () => saveData(data),
  reset: () => {
    data = { startTime: null, elapsed: 0, laps: [] };
    saveData(data);
  }
};
 
//module.exports = data;
