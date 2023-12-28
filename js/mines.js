'use strict'

function createMines(board) {

  for (var i = 0; i < gLevel.mines; i++) {
    // update model
    var mine = getRandomMine(gBoard)
    board[mine.i][mine.j].isMine = true
  }
  return
}

// get random empty position that doesn't include a specipc cell content
function getRandomMine(board) {
  // console.log('gBoard.length', board.length)
  const emptyCells = []

  for (var i = 0; i < board.length; i++) {

    for (var j = 0; j < board[i].length; j++) {
      const cell = board[i][j]
      if (!cell.isMine) {
        emptyCells.push({ i, j })
      }
    }
  }

  if (!emptyCells.length) return null

  const randIdx = getRandomInt(0, emptyCells.length)
  return emptyCells[randIdx]
}

function getRandomInt(min, max) {
  var diff = max - min
  var res = Math.floor(Math.random() * diff + min)
  return res
}