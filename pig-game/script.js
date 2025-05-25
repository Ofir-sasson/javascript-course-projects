'use strict';

//start the game
// Selecting elements
const player0El = document.querySelector('.player--0'); // selecting the first player element
const player1El = document.querySelector('.player--1'); // selecting the second player element
const score0El = document.querySelector('#score--0'); //# is the id selector dot is the class selector
const score1El = document.getElementById('score--1'); //getElementById is the method to get the element by id same as querySelector('#score--1')
const diceEl = document.querySelector('.dice'); // dice element
// buttens elements
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0El = document.querySelector('#current--0'); // current score for player 1
const current1El = document.getElementById('current--1'); // current score for player 2

let scores, currentScore, activePlayer, playing; // declaring variables to hold the scores, current score, active player and game state
const newGame = function () {
  score0El.textContent = 0; //textContent is the property to set the text content of the element
  score1El.textContent = 0;

  diceEl.classList.add('hidden'); //classList is the property to get the class list of the element and add is the method to add a class to the element
  current0El.textContent = 0; // setting the current score for player 1 to 0
  current1El.textContent = 0; // setting the current score for player 2 to 0
  scores = [0, 0]; // final scores for player 1 and player 2
  currentScore = 0; // current score
  activePlayer = 0; // active player, 0 for player 1 and 1 for player 2
  playing = true; // game state, true for playing and false for not playing

  player0El.classList.remove('player--winner'); // removing the winner class from player 1
  player1El.classList.remove('player--winner'); // removing the winner class from player 2
  player0El.classList.add('player--active'); // adding the active class to player 1
  player1El.classList.remove('player--active'); // removing the active class from player 2
};

const switchPlayer = function () {
  currentScore = 0; // resetting the current score to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // toggling the active player between 0 and 1

  player0El.classList.toggle('player--active'); // toggling the active class for player 1
  player1El.classList.toggle('player--active'); // toggling the active class for player 2
};

newGame(); // calling the newGame function to set the initial state of the game

btnRoll.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.remove('hidden'); // remove the hidden class from the dice element
    const dice = Math.trunc(Math.random() * 6) + 1; // Math.random() generates a random number between 0 and 1, multiplying by 6 gives a range of 0 to 5, adding 1 gives a range of 1 to 6
    diceEl.src = `dice-${dice}.png`; // setting the source of the dice image based on the random number generated

    if (dice !== 1) {
      currentScore += dice; // adding the dice value to the current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // updating the current score display for the active player
    } else {
      switchPlayer(); // calling the switchPlayer function to switch to the next player
    }
  }
});

btnNew.addEventListener('click', newGame); // adding an event listener to the new game button to call the newGame function

// adding an event listener to the hold button
// when the hold button is clicked, the current score is added to the final score of the active player and the active player is switched
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore; // adding the current score to the final score of the active player
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; // updating the final score display for the active player

    if (scores[activePlayer] >= 100) {
      playing = false; // setting the game state to not playing
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); // adding the winner class to the active player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); // removing the active class from the active player
      diceEl.classList.add('hidden'); //classList is the property to get the class list of the element and add is the method to add a class to the element
    }
    switchPlayer(); // calling the switchPlayer function to switch to the next player
  }
});
