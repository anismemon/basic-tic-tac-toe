let startButton = document.getElementById('start')

startButton.addEventListener('click', startGame)

// ------------------------------------------------------------------------------------
// player objects and global variables
// player class

class Player {
  constructor(name, symbol) {

    this.name = name
    this.symbol = symbol

  }
}

// player objects

let playerX = new Player("", "X")
let playerO = new Player("", "O")
let currentPlayer

// varibles for getting inputted player names from webpage

let xName = document.getElementById("playerX-name")
let oName = document.getElementById("playerO-name")

// variables to allow retrieving cell info

let c0 = document.getElementById('cell-0')
let c1 = document.getElementById('cell-1')
let c2 = document.getElementById('cell-2')
let c3 = document.getElementById('cell-3')
let c4 = document.getElementById('cell-4')
let c5 = document.getElementById('cell-5')
let c6 = document.getElementById('cell-6')
let c7 = document.getElementById('cell-7')
let c8 = document.getElementById('cell-8')

// other global variables

let cells = document.querySelectorAll("[id^='cell']")
let playerStatus = document.getElementById("status-bar")

// -----------------------------------------------------------------------------------------------
// functions
// function to check whether any winning combination has been achieved during play

function gameWin() {
  let index = 0
  // loop to iterate through winning array combinations
  while (index < 8) {
    // winning array combinations
    let winningArrays = [

      [c0.innerHTML, c1.innerHTML, c2.innerHTML],
      [c0.innerHTML, c3.innerHTML, c6.innerHTML],
      [c0.innerHTML, c4.innerHTML, c8.innerHTML],
      [c3.innerHTML, c4.innerHTML, c5.innerHTML],
      [c6.innerHTML, c7.innerHTML, c8.innerHTML],
      [c1.innerHTML, c4.innerHTML, c7.innerHTML],
      [c2.innerHTML, c5.innerHTML, c8.innerHTML],
      [c2.innerHTML, c4.innerHTML, c6.innerHTML]

    ]
    // function to filter arrays for X's and O's

    checkedMoves = winningArrays[index].filter(function (value) {
      console.log(currentPlayer.symbol)

      return value === currentPlayer.symbol

    })

    index++

    // check that returns first array to contain 3 X's or O's

    if (checkedMoves.length === 3) {
      return checkedMoves
    }
  }
}

// function to delay game (i.e. page) reset

function delayEnding() {
  window.setTimeout(endGame, 4 * 1000)
}

// function to reset board (i.e. page)

function endGame() {
  document.location.reload();
  clearInterval(interval);
}

// draw function checks if board has been completely filled

function draw() {

  let grid =
    [c0.innerHTML, c1.innerHTML, c2.innerHTML, c3.innerHTML, c4.innerHTML, c5.innerHTML, c6.innerHTML, c7.innerHTML, c8.innerHTML]

  fullGrid = grid.filter(function (value) {
    return value !== ''
  })
  if (fullGrid.length === 9) {
    return fullGrid
  }
}

// function to accept player names, insert player into status area, disable start button and start timer

function startGame() {
  playerX.name = xName.value
  playerO.name = oName.value
  currentPlayer = playerX
  playerStatus.innerHTML = currentPlayer.name + "'s Turn";
  event.target.disabled = true
  xName.value = ""
  oName.value = ""
  let time0 = performance.now()
  playGame()
  time1 = performance.now()
  startButton.innerHTML = "Time Elapsed: " + (Math.round(time1 - time0)) + " seconds" // this is meant to be my timer, but it measures how long it takes to click the start button. I think this setup will work, but I don't know where to put the start and end points for the timer.
}

// game proper (with switching players)

let playGame = function () {

  // add click event to each cell on the grid

  for (let square of cells) {
    square.addEventListener('click', gaming)

    function gaming() {

      // prevents clicking on a filled square by throwing alert 
      if (square.innerHTML !== "") {
        window.alert("Please choose an empty square!")
      } else {
        square.innerHTML = currentPlayer.symbol;
      }

      // checks for draw (I'm not sure where to put this: if I put it here at the top, for some reason, it won't print "It's a draw", but it does reset the page. If I put it at the end, it disables winning combinations made on the 9th move.)

      draw()
      if (fullGrid.length === 9) {
        playerStatus.innerHTML = "It's a draw!"
        delayEnding()
      }

      // alternating X / O turns, checking for winning combinations

      if (square.innerHTML === "X") {
        gameWin()
        
        if (checkedMoves.length === 3) {
          playerStatus.innerHTML = currentPlayer.name + " wins!"
          delayEnding()
        } else {
          currentPlayer = playerO
          playerStatus.innerHTML = currentPlayer.name + "'s Turn";
        }

      } else {
        gameWin()

        if (checkedMoves.length === 3) {
          playerStatus.innerHTML = currentPlayer.name + ' wins!'
          delayEnding()
        } else {
          currentPlayer = playerX
          playerStatus.innerHTML = currentPlayer.name + "'s Turn";
        }

      }
      // checks for draw
      // draw()
      // if (fullGrid.length === 9) {
      //   playerStatus.innerHTML = "It's a draw!"
      //   delayEnding()
      // }


    }
  }
}

// need to add clock
// need to improve variable names




// function gameWin() {

//   let combo1 = [c0.innerHTML, c1.innerHTML, c2.innerHTML]
//   let combo2 = [c0.innerHTML, c1.innerHTML, c2.innerHTML]
//   let combo3 = [c0.innerHTML, c4.innerHTML, c8.innerHTML]
//   let combo4 = [c3.innerHTML, c4.innerHTML, c5.innerHTML]
//   let combo5 = [c6.innerHTML, c7.innerHTML, c8.innerHTML]
//   let combo6 = [c1.innerHTML, c4.innerHTML, c7.innerHTML]
//   let combo7 = [c2.innerHTML, c5.innerHTML, c8.innerHTML]
//   let combo8 = [c2.innerHTML, c4.innerHTML, c6.innerHTML]

//   winningCombo1 = combo1.filter(function (value) {
//     return value === currentPlayer.symbol
//   })

//   winningCombo2 = combo2.filter(function (value) {
//     return value === currentPlayer.symbol
//   })

//   winningCombo3 = combo3.filter(function (value) {
//     return value === currentPlayer.symbol
//   })

//   winningCombo4 = combo4.filter(function (value) {
//     return value === currentPlayer.symbol
//   })

//   winningCombo5 = combo5.filter(function (value) {
//     return value === currentPlayer.symbol
//   })

//   winningCombo6 = combo6.filter(function (value) {
//     return value === currentPlayer.symbol
//   })

//   winningCombo7 = combo7.filter(function (value) {
//     return value === currentPlayer.symbol
//   })

//   winningCombo8 = combo8.filter(function (value) {
//     return value === currentPlayer.symbol
//   })
// }

