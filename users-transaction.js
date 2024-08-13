'use strict';

const fs = require('fs');
const axios = require('axios');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');
  main();
});

function readLine() {
  return inputString[currentLine++];
}

async function getNumTransactions(username) {
  try {
    // Fetch user details
    const userResponse = await axios.get(
      `https://jsonmock.hackerrank.com/api/article_users?username=${username}`
    );
    const userData = userResponse.data;

    // Check if user data is found
    if (userData.data && userData.data.length !== 0) {
      const userId = userData.data[0].id;

      // Fetch transactions
      const transactionResponse = await axios.get(
        `https://jsonmock.hackerrank.com/api/transactions?userId=${userId}`
      );
      const transactionData = transactionResponse.data;

      // Return the total number of transactions
      return transactionData.total;
    } else {
      return 'Username Not Found';
    }
  } catch (err) {
    // Handle any errors that occur during the requests
    console.error('Error:', err.message);
    return 'Error fetching data';
  }
}

async function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
  const username = readLine().trim();
  const result = await getNumTransactions(username);
  ws.write(result.toString() + '\n');
  ws.end();
}
