'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('ascii');
let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (chunk) {
  inputString += chunk;
});
process.stdin.on('end', function () {
  inputString = inputString.split('\n');
  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Step 1: Define the Employee constructor function
function Employee(title) {
  this.title = title;
}

// Step 2: Add methods to Employee prototype
Employee.prototype.setTitle = function (title) {
  this.title = title;
};

Employee.prototype.getTitle = function () {
  return this.title;
};

// Step 3: Define the Engineer constructor function
function Engineer(title, isManager) {
  // Call the Employee constructor to set the title
  Employee.call(this, title);
  this.isManager = isManager;
}

// Step 4: Inherit Employee prototype
Engineer.prototype = Object.create(Employee.prototype);

// Step 5: Set the constructor back to Engineer
Engineer.prototype.constructor = Engineer;

// Step 6: Add methods to Engineer prototype
Engineer.prototype.setIsManager = function (isManager) {
  this.isManager = isManager;
};

Engineer.prototype.getIsManager = function () {
  return this.isManager;
};

// Testing the implementation using provided stub code
function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  var inputs = readLine().split(' ');
  var engineerObject = new Engineer(
    inputs[0],
    inputs[1].toLowerCase() === 'true'
  );

  ws.write(
    `Initial Employee Profile - Title is ${engineerObject.getTitle()}. ${
      engineerObject.getIsManager() ? 'Is' : 'Is not'
    } a Manager\n`
  );

  engineerObject.setTitle(readLine());
  engineerObject.setIsManager(readLine().toLowerCase() === 'true');

  ws.write(
    `Final Employee Profile - Title is ${engineerObject.getTitle()}. ${
      engineerObject.getIsManager() ? 'Is' : 'Is not'
    } a Manager\n`
  );

  ws.write(
    `Engineer.prototype has property setTitle: ${Engineer.prototype.hasOwnProperty(
      'setTitle'
    )}\n`
  );
  ws.write(
    `Engineer.prototype has property getTitle: ${Engineer.prototype.hasOwnProperty(
      'getTitle'
    )}\n`
  );
  ws.write(
    `Engineer.prototype has property setIsManager: ${Engineer.prototype.hasOwnProperty(
      'setIsManager'
    )}\n`
  );
  ws.write(
    `Engineer.prototype has property getIsManager: ${Engineer.prototype.hasOwnProperty(
      'getIsManager'
    )}\n`
  );
}
