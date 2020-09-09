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

  static useDice(playerIndex, usedDice) {
    let dice = document.querySelector(`.player__dice--${playerIndex}${usedDice}`);
    dice.classList.add('dice-used');
  }

  static uploadScore(state, currentResult1, currentResult2) {
    const scoreTable1 = document.querySelector('#score--1');
    const scoreTable2 = document.querySelector('#score--2');

    switch (state) {
      case 0:
        scoreTable1.textContent = Number(scoreTable1.textContent) + currentResult1;
        scoreTable2.textContent = Number(scoreTable2.textContent) + currentResult2;
        break;
      case 1:
        scoreTable1.textContent = Number(scoreTable1.textContent) + (currentResult1 + currentResult2);
        break;
      case 2:
        scoreTable2.textContent = Number(scoreTable2.textContent) + (currentResult1 + currentResult2);
        break;
      case 3:
        scoreTable1.textContent = 0;
        scoreTable2.textContent = 0;
        break;
    }
  }

  static continueGame(score1, score2) {
    const playerScoreWindow1 = document.querySelector("#results--1");
    const playerScoreWindow2 = document.querySelector("#results--2");
    const dices = document.querySelectorAll(".player__dice");

    if(score1 > score2) {
      playerScoreWindow1.textContent = Number(playerScoreWindow1.textContent) + 1;
    } else if(score1 < score2) {
      playerScoreWindow2.textContent = Number(playerScoreWindow2.textContent) + 1;
    } else if(score1 === score2) {
      playerScoreWindow1.textContent = Number(playerScoreWindow1.textContent) + 1;
      playerScoreWindow2.textContent = Number(playerScoreWindow2.textContent) + 1;
    }

    // Reset Dices
    dices.forEach(dice => dice.classList.remove('dice-used'));

    // Reset Score
    this.uploadScore(3,0,0);

    // Reset Current
    this.uploadCurrent(1, 0);
    this.uploadCurrent(2, 0);
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
    this.currentResult = this.currentResult;
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

  static compare(currentResult1, currentResult2) {
    if(currentResult1 === currentResult2) {
      return 0;
    } else if(currentResult1 > currentResult2) {
      return 1;
    } else {
      return 2;
    }
  }
}

let playerOne = new Player(1, 0, 0, 0);
let playerTwo = new Player(2, 0, 0, 0);


let currentPlayerIndex = 1;

const button = document.querySelector("#roll-btn");
button.addEventListener("click", () => {
  button.disabled = true;
  setTimeout(function(){button.disabled = false }, 3100);
  UI.changeBoardColor(currentPlayerIndex);
  let randomNumber = Dice.getRandomNumber(6, 1);
  if (currentPlayerIndex === 1) {
    Dice.rollDice(randomNumber);
    playerOne.currentResult = randomNumber;
    UI.uploadCurrent(currentPlayerIndex, playerOne.currentResult);
    playerOne.usedDices++;
    UI.useDice(playerOne.playerIndex, playerOne.usedDices);
    currentPlayerIndex = 2;
  } else {
    Dice.rollDice(randomNumber);
    playerTwo.currentResult = randomNumber;
    UI.uploadCurrent(currentPlayerIndex, playerTwo.currentResult);
    playerTwo.usedDices++;
    UI.useDice(playerTwo.playerIndex, playerTwo.usedDices);
    currentPlayerIndex = 1;
  }

  if(playerOne.usedDices === playerTwo.usedDices) {
    setTimeout(function () {
      let comparisonResult = Dice.compare(playerOne.currentResult, playerTwo.currentResult);
      UI.uploadScore(comparisonResult, playerOne.currentResult, playerTwo.currentResult);
      playerOne.score += playerOne.currentResult;
      playerTwo.score += playerTwo.currentResult;
      UI.uploadCurrent(playerTwo.playerIndex, 0);
      UI.uploadCurrent(playerOne.playerIndex, 0);
    }, 3000);

    if(playerOne.usedDices === 8 && playerTwo.usedDices === 8) {
    
      const newGameBtn = document.getElementById("btn-new-game");
      const contBtn = document.getElementById("btn-continue");
      const alertWindow = document.querySelector(".final-info");

      setTimeout(function(){  
        alertWindow.classList.add('final-info--active');
        newGameBtn.addEventListener('click', () => { location.reload() });
        contBtn.addEventListener("click", () => {
          UI.continueGame(playerOne.score, playerTwo.score);
          currentPlayerIndex = 1;
          playerOne.usedDices = 0;
          playerTwo.usedDices = 0;
          playerOne.currentResult = 0;
          playerTwo.currentResult = 0;
          alertWindow.classList.remove('final-info--active');
        });
      }, 3000);
      playerOne.score = 0;
      playerTwo.score = 0;
    }
  }
});
