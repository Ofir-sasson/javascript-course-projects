'use strict';

// Define the secret number
let secretNumber = Math.trunc(Math.random() * 20) + 1;

// Initialize the score and high score
let score = 20;
let highscore = 0;

// Function to display messages in the UI
const displayMessage = function (type, value) {
  const messageElement = document.querySelector('.message');
  const scoreElement = document.querySelector('.score');
  const numberElement = document.querySelector('.number');
  const bodyElement = document.querySelector('body');

  switch (type) {
    case 'message':
      messageElement.textContent = value; // Update the message displayed to the user
      break;
    case 'score':
      scoreElement.textContent = value; // Update the score displayed to the user
      break;
    case 'number':
      numberElement.textContent = value; // Update the displayed number
      break;
    case 'background':
      bodyElement.style.backgroundColor = value; // Change the background color of the body
      break;
    case 'width':
      numberElement.style.width = value; // Change the width of the number display
      break;
    default:
      console.error('Invalid message type');
  }
};

// Event listener for the "Check" button
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    // If no number is entered, display an error message
    displayMessage('message', '⛔ No number!');
  } else if (guess === secretNumber) {
    // If the guessed number is correct
    displayMessage('message', '🎉 Correct Number!');
    displayMessage('background', '#60b347');
    displayMessage('number', secretNumber);
    displayMessage('width', '30rem');

    if (score > highscore) {
      // If the current score is higher than the high score, update the high score
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    // If the guessed number is incorrect
    if (score > 1) {
      // If there are still attempts left
      displayMessage(
        'message',
        guess > secretNumber ? '📈 Too high!' : '📉 Too low!'
      );
      score--;
      displayMessage('score', score);
    } else {
      // If no attempts are left
      displayMessage('message', '💥 You lost the game!');
      displayMessage('score', 0);
    }
  }
});

// Event listener for the "Again" button
document.querySelector('.again').addEventListener('click', function () {
  // Reset the game state
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage('message', 'Start guessing...');
  displayMessage('score', score);
  displayMessage('number', '?');
  document.querySelector('.guess').value = '';
  displayMessage('background', '#222');
  displayMessage('width', '15rem');
});
