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
    console.log(dice);
    dice.classList.add('dice-used');
  }

  static uploadScore(state, currentResult1, currentResult2) {
    const scoreTable1 = document.querySelector('#score--1');
    const scoreTable2 = document.querySelector('#score--2');

    switch (state) {
      case 0:
        scoreTable1.textContent = Number(scoreTable1.textContent) + currentResult1;
        scoreTable2.textContent = Number(scoreTable1.textContent) + currentResult2;
        break;
      case 1:
        scoreTable1.textContent = Number(scoreTable1.textContent) + (currentResult1 + currentResult2);
        break;
      case 2:
        scoreTable2.textContent = Number(scoreTable2.textContent) + (currentResult1 + currentResult2);
        break;
    }
    
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

const button = document.querySelector(".btn");
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
      UI.uploadCurrent(playerTwo.playerIndex, 0);
      UI.uploadCurrent(playerOne.playerIndex, 0);
    }, 3000);

    if(playerOne.usedDices ===8 && playerTwo.usedDices === 8) {
    

      setTimeout(function(){  
        if (playerOne.score > playerTwo.score) {
        alert(`Congratulations! The winner is player 1`);
        }else if(playerOne.score < playerTwo.score) {
        alert(`Congratulations! The winner is player 2`);
        } else {
        alert(`Congratulations! It seems that we have a tie.`);
        
      } 
      location.reload();}, 3000);
    }
  }
});

