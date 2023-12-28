'use strict'
// variables to update model
var gBoard

var gFirstClick = true

var gLevel = {
    size: 4,
    mines: 2
}
var gLives = gLevel.mines / 2

var gGames = {
    isOn: false,
    showCount: 0,
    markedCount: 0,
    secsPassed: 0,
}

// variable for updating DOM
const MINE = '💣'
const LOSE = '😢 Lose'
const NORMAL = '😄 Normal'
const WIN = '🙂 Win!'
const FLAG = '☂️'

function onInit() {
    // update model
    gGames.isOn = true
    gBoard = createBoard()
    createMines(gBoard)
    renderBoard(gBoard)
    gGames.markedCount = 0
    // update DOM
    const elSmile = document.querySelector('.smile')
    elSmile.innerText = NORMAL
    gLives = gLevel.mines / 2
    //gLives = 3
    const elLives = document.querySelector('.lives')
    elLives.innerText = `life left: ${gLives}`
    gFirstClick = true


}
// create matrix
function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function setLevel(elBtn) {
    //update model
    gLevel.size = +elBtn.innerText
    gLevel.mines = +elBtn.innerText / 2

    //update DOM
    onInit()

}

function createBoard() {

    // create board matrix
    var board = createMat(gLevel.size, gLevel.size)
    // update model gBoard
    // create a game board
    for (var i = 0; i < gLevel.size; i++) {

        for (var j = 0; j < gLevel.size; j++) {
            // for every board cell we include an obj

            board[i][j] = {
                minesAroundCount: null,
                isShown: false,
                isMine: false,
                isMarked: false
            }



        }
    }


    // board[1][0].isMine = true
    // board[1][1].isMine = true
    // board[3][3].isMine = true



    return board
}







function renderBoard(board) {
    // update DOM accourding the data in the model
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[i].length; j++) {
            var cell = board[i][j]
            var className = (cell.isMine) ? 'mine' : ''

            strHTML += `<td data-i="${i}" data-j="${j}" class="cell ${className} ${i} ${j}" 
            onclick="onCellClicked(this, ${i}, ${j})" oncontextmenu="onCellMarked(this); checkWin(this,${i}, ${j},event)"
             ></td>`


            //update model
            var minesAmount = (!board[i][j].isMine) ? setMinesNegsCount(i, j, gBoard) : null
            board[i][j].minesAroundCount = minesAmount


        }
        strHTML += '</tr>'

    }
    const elTable = document.querySelector(".game-container")
    elTable.innerHTML = strHTML

}


// count the mines around the cell
function setMinesNegsCount(rowIdx, colIdx, mat) {
    var neighborsCount = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= mat[i].length) continue
            if (mat[i][j].isMine) neighborsCount++
        }
    }
    return neighborsCount
}


function onCellClicked(elCell, i, j) {
    if (gGames.isOn) {
        if (gFirstClick) {
            // update model
            if (gBoard[i][j].isMine) gLevel.mines--
            gBoard[i][j].isMine = false

            // update DOM
            renderBoard(gBoard)

            gFirstClick = false
        }

        //update DOM
        elCell.innerText = gBoard[i][j].isMine ? MINE : gBoard[i][j].minesAroundCount
        // on click if hint is clicked revele all cells around
        cellNeigberReveled(i, j, gBoard)
        if (setMinesNegsCount(i, j, gBoard) === 0) {
            expandShown(gBoard, this, i, j)
            gBoard[i][j].minesAroundCount = ''
        }

        // update model
        checkGameOver(elCell)



    }
}


function onCellMarked(elCell) {
    // check model and acouring to that update DOM
    if (gGames.isOn) {
        elCell.innerText = FLAG
    }
}




function expandShown(board, elCell, rowIdx, colIdx) {

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[i].length) continue
            if (!board[rowIdx][colIdx].isMine) {

                //put data into DOM with data from Model
                const elData = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                elData.innerText = board[i][j].minesAroundCount


            }
        }
    }

}