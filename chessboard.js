const MYBODY = document.getElementsByTagName('body')[0];
const BOARD_SIZE = 8;
const DARK_PLAYER = 'dark';
const WHITE_PLAYER = 'white';
const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';

let myTable = document.createElement('table');
let selectedCell;
let moveOptions;
let pieces = [];

class Piece {
    constructor(row, col, type, player) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;
    }

    getPossibleMoves() {
        let relativeMoves;
        if (this.type === PAWN) {
            relativeMoves = this.getPawnRelativeMoves();
        } else if (this.type === ROOK) {
            relativeMoves = this.getRookRelativeMoves();
        } else if (this.type === KNIGHT) {
            relativeMoves = this.getKnightRelativeMoves();
        } else if (this.type === BISHOP) {
            relativeMoves = this.getBishopRelativeMoves();
        } else if (this.type === KING) {
            relativeMoves = this.getKingtRelativeMoves();
        } else if (this.type === QUEEN) {
            relativeMoves = this.getQueentRelativeMoves();
        } else {
            console.log("Unknown type", type)
        }

        let absoluteMoves = [];
        for (let relativeMove of relativeMoves) {
            const absoluteRow = this.row + relativeMove[0];
            const absoluteCol = this.col + relativeMove[1];
            absoluteMoves.push([absoluteRow, absoluteCol]);
        }

        let filteredMoves = [];
        for (let absoluteMove of absoluteMoves) {
            const absoluteRow = absoluteMove[0];
            const absoluteCol = absoluteMove[1];
            if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
                filteredMoves.push(absoluteMove);
            }
        }
        console.log('filteredMoves', filteredMoves);
        return filteredMoves;
    }

    getPawnRelativeMoves() {
        // TODO: Give different answer to black player
        if (this.player === WHITE_PLAYER) {
            return [[1, 0]];
        } else if (this.player === DARK_PLAYER) {
            return [[-1, 0]];
        }
    }
    getRookRelativeMoves() {
        let result = [];
        for (let i = 1; i < BOARD_SIZE; i++) {
            result.push([i, 0]);
            result.push([-i, 0]);
            result.push([0, i]);
            result.push([0, -i]);
        }
        return result;
    }
    getBishopRelativeMoves() {
        let result = [];
        for (let i = 1; i < BOARD_SIZE; i++) {
            result.push([i, i]);
            result.push([-i, -i]);
            result.push([-i, i]);
            result.push([i, -i]);
        }
        return result;
    }
    getKnightRelativeMoves() {
        let result = [];
        for (let i = 1; i < 2; i++) {
            result.push([i, (i * 2)]);
            result.push([i, -(i * 2)]);
            result.push([-i, -(i * 2)]);
            result.push([-i, (i * 2)]);
            result.push([(i * 2), -i]);
            result.push([(i * 2), i]);
            result.push([-(i * 2), i]);
            result.push([-(i * 2), -i]);
        }
        return result;
    }
    getKingtRelativeMoves() {
        let result = [];
        result.push([0, 1]);
        result.push([0, -1]);
        result.push([1, 0]);
        result.push([-1, 0]);
        return result;
    }
    getQueentRelativeMoves() {
        let result = [];
        for (let i = 1; i < BOARD_SIZE; i++) {
            result.push([i, i]);
            result.push([-i, -i]);
            result.push([-i, i]);
            result.push([i, -i]);
            result.push([i, 0]);
            result.push([-i, 0]);
            result.push([0, i]);
            result.push([0, -i]);
        }
        return result;
    }

}

function getInitialBoard() {
    let result = [];
    addPiece(result, 0, WHITE_PLAYER)
    addPiece(result, 7, DARK_PLAYER)

    for (i = 0; i < BOARD_SIZE; i++) {
        result.push(new Piece(1, i, "pawn", WHITE_PLAYER));
        result.push(new Piece(6, i, "pawn", DARK_PLAYER));
    }
    return result;
}

function addPiece(result, row, player) {
    result.push(new Piece(row, 0, "rook", player));
    result.push(new Piece(row, 1, "knight", player));
    result.push(new Piece(row, 2, "bishop", player));
    result.push(new Piece(row, 3, "queen", player));
    result.push(new Piece(row, 4, "king", player));
    result.push(new Piece(row, 5, "bishop", player));
    result.push(new Piece(row, 6, "knight", player));
    result.push(new Piece(row, 7, "rook", player));
}



function addImage(cell, player, name) {
    const image = document.createElement('img');
    image.src = player + '/' + name + '.png';
    cell.appendChild(image);
}

function onCellClick(event, row, col) {
    console.log(row);
    console.log(col);
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            myTable.rows[i].cells[j].classList.remove('possible-move');
        }
    }

    for (let piece of pieces) {
        if (piece.row === row && piece.col === col) {
            console.log(piece);
            let possibleMoves = piece.getPossibleMoves();
            for (let possibleMove of possibleMoves)
                myTable.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
        }
    }

    if (selectedCell !== undefined) {
        selectedCell.classList.remove('selected');
    }
    selectedCell = event.currentTarget;
    selectedCell.classList.add('selected');
}



function chessBoardCreation() {
    MYBODY.appendChild(myTable);
    for (let row = 0; row < BOARD_SIZE; row++) {
        const rowElement = myTable.insertRow();
        for (let col = 0; col < BOARD_SIZE; col++) {
            const cell = rowElement.insertCell();
            if ((row + col) % 2 === 0) {
                cell.className = 'light-cell';
            } else {
                cell.className = 'dark-cell';
            }
            cell.addEventListener('click', (event) => onCellClick(event, row, col));
        }
    }
    pieces = getInitialBoard();

    for (let piece of pieces) {
        addImage(myTable.rows[piece.row].cells[piece.col], piece.player, piece.type);

    }

}
window.addEventListener('load', chessBoardCreation)

