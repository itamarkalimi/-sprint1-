'use strict'
var gBoard

var gameCell = {
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: false
}

var gLevel = {
    size: 4,
    mines: 2
}

var gGames = {
    isOn: false,
    showCount: 0,
    markedCount: 0,
    secsPassed: 0,
}

function onInit() {
    gBoard = buildBoard()
    console.log(gBoard)
    renderBoard(gBoard)
}

function buildBoard() {
    const gameBoard = []
    for (var i = 0; i < gLevel.size; i++) {
        gameBoard[i] = []
        for (var j = 0; j < gLevel.size; j++) {
            // create cell 
            gameBoard[i][j] = gameCell
            //console.log(gameCell)
        }
    }
    gameBoard[0][1] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: true,
        isMarked: false
    }
    gameBoard[1][0] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: true,
        isMarked: false
    }
    gameBoard[1][3] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: true,
        isMarked: false
    }
    gameBoard[1][2] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: true,
        isMarked: false
    }
    return gameBoard
}


function renderBoard(board) {


    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr class="game-row" >\n`
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            // add class to cell
            var className = (cell.isMine && cell.isShown) ? 'mine-cell' : ''
            strHTML += `\t<td class="cell ${className}" 
                            onclick="onCellClicked(this, ${i}, ${j})" >
                         </td>\n`
        }
        strHTML += `</tr>\n`
    }
    console.log(strHTML)
    setMinesNegsCount(board)
    const elGameTable = document.querySelector('.game-table')
    elGameTable.innerHTML = strHTML

}

function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            // update every cell object property
            board[i][j].minesAroundCount = countMinesAroundCount(i, j, board)
            console.log(`board[${i}][${j}].minesAroundCount:`, board[i][j].minesAroundCount)
        }
    }

}

// count the mines around the cell
function countMinesAroundCount(rowIdx, colIdx, mat) {
    var minesAroundCount = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= mat[i].length) continue
            if (mat[i][j]) {
                if (mat[i][j].isMine === true) minesAroundCount++
            }

        }
    }
    console.log('minesAroundCount: ', minesAroundCount)
    return minesAroundCount
}

function onCellClicked(elCell, i, j) {
    // get cell
    console.log('Cell clicked: ', elCell, i, j)
    // get data from function setNeg
    // set the data in cell innerText
    var cell = gBoard[i][j]
    console.log('onCellClicked - cell', cell)
    elCell.innerText = cell.minesAroundCount
    console.log('elCell.innerText,minesAroundCount', cell.minesAroundCount)
    // change style of cell 
}

function onCellClickedTyota(elCell, i, j) {
    const cell = gCinema[i][j]
    // ignore none seats and booked
    if (!cell.isSeat || cell.isBooked) return

    console.log('Cell clicked: ', elCell, i, j)

    // Support selecting a seat
    elCell.classList.add('selected')

    if (gElSelectedSeat) {
        gElSelectedSeat.classList.remove('selected')
    }

    // Only a single seat should be selected
    gElSelectedSeat = (gElSelectedSeat !== elCell) ? elCell : null

    // When seat is selected a popup is shown
    if (gElSelectedSeat) {
        showSeatDetails({ i, j })
    } else {
        hideSeatDetails()
    }
}

function onCellMarked(elCell) {

}

function checkGameOver() {

}

function expandShown(board, elCell, i, j) {

}