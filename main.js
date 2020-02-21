// need to: make the start button launch the game AND disable itself on one click
// create status text (that (eventually) changes when players switch and when game ends)

let startButton = document.getElementById('start')

startButton.addEventListener('click', startGame)

// global variables 
// let activePlayer = '';
// let playerXTurn = "Player X's Turn"
// let playerOTurn = "Player O's Turn"

// player class

class Player {
  constructor(name, status, symbol) {
    this.name = name
    this.status = status
    this.symbol = symbol

  }
}

// player objects

let playerX = new Player("Player X", "", "X")
let playerO = new Player("Player O", "", "O")
let currentPlayer

// other variables

let board = document.getElementsByClassName('board')
let cells = document.querySelectorAll("[id^='cell']")
let xMove = 'X'
let oMove = 'O'

let playerStatus = document.getElementById("status-bar")


// function to insert player into status area and disable start button

function startGame() {
  currentPlayer = playerX
  playerStatus.innerHTML = currentPlayer.name + "'s Turn";
  event.target.disabled = true
  moves()
}

// game proper (with switching players)

let moves = function () {

  for (let square of cells) {

    square.addEventListener('click', function () {

      if (square.innerHTML !== "") {
        window.alert("Please choose an empty square!")
      } else {
        square.innerHTML = currentPlayer.symbol;
      }

      if (square.innerHTML === "X") {
        currentPlayer = playerO
        playerStatus.innerHTML = currentPlayer.name + "'s Turn";

      } else {
        currentPlayer = playerX
        playerStatus.innerHTML = currentPlayer.name + "'s Turn";
      }
    })
  }
}



