class UI {
  static changeBoardColor(playerIndex) {
    const player1Board = document.querySelector(".player--1");
    const player2Board = document.querySelector(".player--2");

    switch (playerIndex) {
      case 1:
        player2Board.classList.remove("player-active");
        player1Board.classList.add("player-active");
        break;
      case 2:
        player1Board.classList.remove("player-active");
        player2Board.classList.add("player-active");
        break;
    }
  }

  static uploadScore(playerIndex, randomNumber) {
    const scoreTable = document.querySelector(`#score--${playerIndex}`);
    scoreTable.textContent += randomNumber;
  }

  static uploadCurrent(playerIndex, randomNumber) {
    const currentTable = document.querySelector(`#current--${playerIndex}`);
    setTimeout(function () {
      currentTable.textContent = randomNumber;
    }, 3000);
  }
}

class Player {
  constructor(playerIndex, score, collectedDices, usedDices) {
    this.playerIndex = playerIndex;
    this.score = score;
    this.collectedDices = collectedDices;
    this.usedDices = usedDices;
  }
}

class Dice {
  static rollDice(randomNumber) {
    const cube = document.querySelector(".cube");
    cube.style.transition = "3s";
    let xSpins = this.getRandomNumber(-3, 3);
    let ySpins = this.getRandomNumber(-3, 3);
    cube.classList.add(`cube--${randomNumber}`);
    setTimeout(function () {
      cube.classList.remove(`cube--${randomNumber}`);
      cube.style.transition = "0s";
    }, 3000);
    let currentSide = document.querySelector(`.cube--${randomNumber}`);
    currentSide.style.setProperty("--x-spins", xSpins);
    currentSide.style.setProperty("--y-spins", ySpins);
  }

  static getRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

// Declaration of 2 players
let playerOne = new Player(1, 0, 0, 0);
let playerTwo = new Player(2, 0, 0, 0);

// Current Player Index
let currentPlayerIndex = 1;

const button = document.querySelector(".btn");
button.addEventListener("click", () => {
  UI.changeBoardColor(currentPlayerIndex);
  let randomNumber = Dice.getRandomNumber(6, 1);
  if (currentPlayerIndex === 1) {
    Dice.rollDice(randomNumber);
    UI.uploadCurrent(currentPlayerIndex, randomNumber);
    currentPlayerIndex = 2;
  } else {
    Dice.rollDice(randomNumber);
    UI.uploadCurrent(currentPlayerIndex, randomNumber);
    currentPlayerIndex = 1;
  }
});

// SWITCHING COLOR
// let button = document.querySelector(".btn");
// let index = 1;
// button.addEventListener("click", () => {
//   console.log(index);
//   UI.changeBoardColor(index);
//   if (index === 1) {
//     index = 2;
//   } else {
//     index = 1;
//   }
// });

// ROLLING
// let button = document.querySelector(".btn");
// button.addEventListener("click", () => {
//   Dice.rollDice();
// });
