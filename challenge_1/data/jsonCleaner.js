const fs = require("fs");
const path = require("path");

var json = JSON.parse(fs.readFileSync(path.join(__dirname, "./db.json")));

dbOutput = fs.createWriteStream(path.join(__dirname, "./cleanedDB.json"));

dbOutput.write('{"events": [');

for (let i = 0; i < json.events.length; i++) {
  Object.assign(json.events[i], { id: i + 1 });
  if (i === json.events.length - 1) {
    dbOutput.write(`\n${JSON.stringify(json.events[i])} `);
  } else {
    dbOutput.write(`\n${JSON.stringify(json.events[i])}, `);
  }
}

dbOutput.write('], \n"favorites": []}');
