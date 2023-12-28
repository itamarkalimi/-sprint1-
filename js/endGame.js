'use strict'

function checkGameOver(elCell) {
  // update model accouring data in model and DOM
  if (elCell.innerText === MINE && gLives !== 0) {
    gLives--
  }
  // update DOM with model gLives
  const elLives = document.querySelector('.lives')
  elLives.innerText = `life left: ${gLives}`
  // update DOM acouring data from model and then change the model status
  if (gLives === 0) {
    elLives.innerText = `life left: ${gLives}`
    gGames.isOn = false
  }
   // update model acourding data in the model status
  if (!gGames.isOn) {
    const elSmile = document.querySelector('.smile')
    elSmile.innerText = LOSE
  }
}

function checkWin(elCell, i, j, event) {
  if (gGames.isOn) {
    event.preventDefault()
    // update
    if (gBoard[i][j].isMine === true && elCell.innerText === FLAG && gGames.markedCount !== gLevel.mines) {
      gGames.markedCount++

    }
    // update model status and DOM accourding
    if (gGames.markedCount === gLevel.mines) {
      const elSmile = document.querySelector(".smile")
      elSmile.innerText = WIN
      gGames.isOn = false
    }
  }
}

