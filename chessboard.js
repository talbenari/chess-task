let myBody = document.getElementsByTagName('body')[0];
const BOARD_SIZE = 8;
const DARK_PLAYER = 'dark';
const WHITE_ROTATED_PLAYER = 'white-rotated';
const myCell = document.getElementsByTagName('td');
let myTable = document.createElement('table');
let selectedCell;
let moveOptions;
let pieces = [];

class piece {
    constructor(row, col, type, player) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;
    }
}

function getInitialBoard() {
    let result = [];
    result.push(new piece(0, 0, "rook", WHITE_ROTATED_PLAYER));
    result.push(new piece(0, 1, "knight", WHITE_ROTATED_PLAYER));
    result.push(new piece(0, 2, "bishop", WHITE_ROTATED_PLAYER));
    result.push(new piece(0, 3, "queen", WHITE_ROTATED_PLAYER));
    result.push(new piece(0, 4, "king", WHITE_ROTATED_PLAYER));
    result.push(new piece(0, 5, "bishop", WHITE_ROTATED_PLAYER));
    result.push(new piece(0, 6, "knight", WHITE_ROTATED_PLAYER));
    result.push(new piece(0, 7, "rook", WHITE_ROTATED_PLAYER));
    result.push(new piece(1, 0, "pawn", WHITE_ROTATED_PLAYER));
    result.push(new piece(1, 1, "pawn", WHITE_ROTATED_PLAYER));
    result.push(new piece(1, 2, "pawn", WHITE_ROTATED_PLAYER));
    result.push(new piece(1, 3, "pawn", WHITE_ROTATED_PLAYER));
    result.push(new piece(1, 4, "pawn", WHITE_ROTATED_PLAYER));
    result.push(new piece(1, 5, "pawn", WHITE_ROTATED_PLAYER));
    result.push(new piece(1, 6, "pawn", WHITE_ROTATED_PLAYER));
    result.push(new piece(1, 7, "pawn", WHITE_ROTATED_PLAYER));
    result.push(new piece(6, 0, "pawn", DARK_PLAYER));
    result.push(new piece(6, 1, "pawn", DARK_PLAYER));
    result.push(new piece(6, 2, "pawn", DARK_PLAYER));
    result.push(new piece(6, 3, "pawn", DARK_PLAYER));
    result.push(new piece(6, 4, "pawn", DARK_PLAYER));
    result.push(new piece(6, 5, "pawn", DARK_PLAYER));
    result.push(new piece(6, 6, "pawn", DARK_PLAYER));
    result.push(new piece(6, 7, "pawn", DARK_PLAYER));
    result.push(new piece(7, 0, "rook", DARK_PLAYER));
    result.push(new piece(7, 1, "knight", DARK_PLAYER));
    result.push(new piece(7, 2, "bishop", DARK_PLAYER));
    result.push(new piece(7, 3, "king", DARK_PLAYER));
    result.push(new piece(7, 4, "queen", DARK_PLAYER));
    result.push(new piece(7, 5, "bishop", DARK_PLAYER));
    result.push(new piece(7, 6, "knight", DARK_PLAYER));
    result.push(new piece(7, 7, "rook", DARK_PLAYER));
    return result;
}

function addPiece(cell, player, name) {
    const image = document.createElement('img');
    image.src = player + '/' + name + '.png';
    cell.appendChild(image);
}

function onCellClick(event) {
    if (moveOptions !== undefined) {
        moveOptions.classList.remove('selected');
    }
    moveOptions = event.currentTarget;
    pawnMovement(DARK_PLAYER);
}


function pawnMovement(player) {
    if (player = DARK_PLAYER) {
        for (i = 0; i < 2; i++) {
            myTable.rows[6 - i].cells[0].classList.add('selected');
        }
    } else if (player = WHITE_ROTATED_PLAYER) {
        for (i = 0; i < 2; i++) {
            myTable.rows[1 + i].cells[0].classList.add('selected');
        }
    }

}


function chessBoardCreation() {

    myBody.appendChild(myTable);
    for (i = 0; i < BOARD_SIZE; i++) {
        const row = myTable.insertRow();
        for (j = 0; j < BOARD_SIZE; j++) {
            const cell = row.insertCell();
            cell.id = 'cell-' + i.toString() + '_' + j.toString();
            if ((i + j) % 2 === 0) {
                cell.className = 'light-cell';
            } else {
                cell.className = 'dark-cell';
            }
            cell.addEventListener('click', onCellClick);
        }
    }
    pieces = getInitialBoard();

    for (let piece of pieces) {
        addPiece(myTable.rows[piece.row].cells[piece.col], piece.player, piece.type);

    }

}
window.addEventListener('load', chessBoardCreation)

