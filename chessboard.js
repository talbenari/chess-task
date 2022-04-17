let myBody = document.getElementsByTagName('body')[0];

let myHeading = document.createElement('h1');
const BOARD_SIZE = 8;
const DARK_TYPE = 'dark';
const WHITE_ROTATED_TYPE = 'white-rotated';

function addPiece(cell, type, name) {
    const image = document.createElement('img');
    image.src = type + '/' + name + '.png';
    cell.appendChild(image);
}

function chessBoardCreation() {
    let myTable = document.createElement('table');
    myBody.appendChild(myTable);
    for (i = 0; i < BOARD_SIZE; i++) {
        const row = myTable.insertRow();
        for (j = 0; j < BOARD_SIZE; j++) {
            const cell = row.insertCell();
            cell.id = 'cell-' + i.toString() + '_' + j.toString();
            if ((i + j) % 2 == 0) {
                cell.className = 'light-cell';
            }
            else {
                cell.className = 'dark-cell';
            }
            if (i === 1) {
                addPiece(cell, WHITE_ROTATED_TYPE, 'pawn');
            } else if (i === 6) {
                addPiece(cell, DARK_TYPE, 'pawn');
            }
            if (i === 0) {
                if (j === 0) {
                    addPiece(cell, WHITE_ROTATED_TYPE, 'rook');
                }
                else if (j === 1) {
                    addPiece(cell, WHITE_ROTATED_TYPE, 'knight');
                }
                else if (j === 2) {
                    addPiece(cell, WHITE_ROTATED_TYPE, 'bishop');
                }
                else if (j === 3) {
                    addPiece(cell, WHITE_ROTATED_TYPE, 'queen');
                }
                else if (j === 4) {
                    addPiece(cell, WHITE_ROTATED_TYPE, 'king');
                }
                else if (j === 5) {
                    addPiece(cell, WHITE_ROTATED_TYPE, 'bishop');
                }
                else if (j === 6) {
                    addPiece(cell, WHITE_ROTATED_TYPE, 'knight');
                }
                else if (j === 7) {
                    addPiece(cell, WHITE_ROTATED_TYPE, 'rook');
                }
            }
            if (i === 7) {
                if (j === 0) {
                    addPiece(cell, DARK_TYPE, 'rook');
                }
                else if (j === 1) {
                    addPiece(cell, DARK_TYPE, 'knight');
                }
                else if (j === 2) {
                    addPiece(cell, DARK_TYPE, 'bishop');
                }
                else if (j === 3) {
                    addPiece(cell, DARK_TYPE, 'king');
                }
                else if (j === 4) {
                    addPiece(cell, DARK_TYPE, 'queen');
                }
                else if (j === 5) {
                    addPiece(cell, DARK_TYPE, 'bishop');
                }
                else if (j === 6) {
                    addPiece(cell, DARK_TYPE, 'knight');
                }
                else if (j === 7) {
                    addPiece(cell, DARK_TYPE, 'rook');
                }
            }
        }
    }
};
window.addEventListener('load', () => {
    chessBoardCreation();
});

