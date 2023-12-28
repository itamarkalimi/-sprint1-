'use strict'

var gIsHintStatus = false

function activeHint(elHint) {
  elHint.style.backgroundColor = 'blue'
  gIsHintStatus = true

  setTimeout(() => {
    elHint.innerText = ""
  }, 1000)

}

function cellNeigberReveled(rowIdx, colIdx, mat) {
  if (gIsHintStatus) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
      if (i < 0 || i >= mat.length) continue

      for (var j = colIdx - 1; j <= colIdx + 1; j++) {
        if (i === rowIdx && j === colIdx) continue
        if (j < 0 || j >= mat[i].length) continue
        var cellContent = (mat[i][j].isMine) ? MINE : setMinesNegsCount(i, j, gBoard)
        var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
        elCell.innerText = cellContent
        console.log('elCell:', elCell)
        // update DOM
        hideNegCells(rowIdx, colIdx, mat)
      }

    }
  }
}

function hideNegCells(rowIdx, colIdx, mat) {
  setTimeout(() => {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
      if (i < 0 || i >= mat.length) continue

      for (var j = colIdx - 1; j <= colIdx + 1; j++) {
        if (i === rowIdx && j === colIdx) continue
        if (j < 0 || j >= mat[i].length) continue


        gIsHintStatus = false
        var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
        elCell.innerText = ''
        console.log('elCell.innerText:', elCell.innerText)

      }

    }
  }, 1000)
}

