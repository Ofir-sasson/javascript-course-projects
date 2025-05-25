'use strict';

/*
//dom manipulation
console.log(document.querySelector('.message').textContent); // "Start guessing...";
document.querySelector('.message').textContent = 'Correct Number!'; // Change message to "Correct Number!"

document.querySelector('.number').textContent = 13; // Change the number to 13
document.querySelector('.score').textContent = 10; // Change the score to 20

document.querySelector('.guess').value = 23; // Set the value of the input field to 23
*/

//define the secret number
let secretNumber = Math.trunc(Math.random() * 20) + 1; // Generate a random number between 1 and 20
//math.trunc() is used to round down the number to the nearest integer

// Initialize the score
//state variable to keep track of the score - this will be updated as the user guesses
let score = 20; // Set the initial score to 20
let highscore = 0; // Initialize a variable to keep track of the high score

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message; // Function to display messages in the UI
};

// Event listener for the "Check" button
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value); // Convert the input value to a number
  console.log(guess); // Log the guessed number to the console

  if (!guess) {
    displayMessage('⛔ No number!'); // Show message if no number is entered
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!'); // Show message for correct guess

    //does not change the css file, but changes the style of the element in the DOM
    document.querySelector('body').style.backgroundColor = '#60b347'; // Change background color to green for correct guess

    document.querySelector('.number').textContent = secretNumber; // Display the secret number in the UI (for testing purposes)
    document.querySelector('.number').style.width = '30rem'; // Change the width
    // of the number display

    if (score > highscore) {
      highscore = score; // Update the high score if the current score is greater
      document.querySelector('.highscore').textContent = highscore; // Display the new high score in the UI
    }

    //when the user guesses the wrong number
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // Check if the score is greater than 0 before updating the message and score - greater than 1 to allow for at least one more guess
      // This prevents the score from going below 0
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!'); // Show message if guess is too high
      score--;
      document.querySelector('.score').textContent = score; // Update the score in the UI
    } else {
      displayMessage('💥 You lost the game!'); // Show message if the score is 0
      document.querySelector('.score').textContent = 0; // Ensure the score is displayed as 0 in the UI
    }
  }
});
// Event listener for the "Again" button
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1; // Generate a new secret number

  displayMessage('Start guessing...'); // Reset the message
  document.querySelector('.score').textContent = score; // Reset the score display
  document.querySelector('.number').textContent = '?'; // Reset the displayed number
  document.querySelector('.guess').value = ''; // Clear the input field
  document.querySelector('body').style.backgroundColor = '#222'; // Reset background color
  document.querySelector('.number').style.width = '15rem'; // Reset the width of the number display
});
