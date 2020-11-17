export function clearCells() {
    document.querySelectorAll('.sudokuColumn').forEach(sudokuCell => {
        sudokuCell.innerText = null;
        if (sudokuCell.classList.contains('solution')) {
            sudokuCell.classList.remove('solution')
        }
    })
}

let sudokuMatrix;

export function resolveSudoku() {

    //Create matrix with numbers from sudoku HTML DOM
    sudokuMatrix = arrayValuesSudoku();

    //Start solving the sudoku
    solve();

    return sudokuMatrix
}

function arrayValuesSudoku() {

    const allSudokuCells = document.querySelectorAll('.sudokuColumn');
    let arrayCellsValues = new Array();

    allSudokuCells.forEach(cell => {
        arrayCellsValues = [...arrayCellsValues, cell.innerText];
    });

    return arrayCellsValues.reduce((rows, key, index) => (index % 9 == 0 ? rows.push([Number(key)]) 
    : rows[rows.length - 1].push(Number(key))) && rows, []);
    
}

function solve() {

    if (!isCellEmpty()) {
        return true
    }

    //Retrieve empty cell position
    const { indexRow, indexColumn } = isCellEmpty();

    //Try to see if the number is ok (from 1 to 9)
    for (let number = 1; number < 10; number++) {
        if (isNumberValid(indexRow, indexColumn, number)) {

            //Place the number in empty cell
            sudokuMatrix[indexRow][indexColumn] = number;

            if (solve()) {
                return true
            }

            //Backtracking
            sudokuMatrix[indexRow][indexColumn] = 0;

        }
    }

    return false
};

function isNumberValid(i, j, startNumber) {
    
    //Check row
    if (numberInRow(i, j, startNumber, sudokuMatrix)) {
        return false
    }

    //Check column
    if (numberInColumn(j, i, startNumber, sudokuMatrix)) {
        return false
    }

    //Check submatrix
    const x_axis_sudokuMatrix = Math.floor(i / 3);
    const y_axis_sudokuMatrix = Math.floor(j / 3);

    if (numberInGrid(i, j, x_axis_sudokuMatrix, y_axis_sudokuMatrix, startNumber, sudokuMatrix)) {
        return false
    }

    return true

};

function numberInRow(indexRow, indexColumn, numberToCheck) {
    for (let j = 0; j < 9; j++) {
        if (sudokuMatrix[indexRow][j] === numberToCheck && j !== indexColumn) {
            return true
        }
    }
    return false
};

function numberInColumn(indexColumn, indexRow, numberToCheck) {
    for (let i = 0; i < 9; i++) {
        if (sudokuMatrix[i][indexColumn] === numberToCheck && i !== indexRow) {
            return true
        }
    }
    return false
};

function numberInGrid(indexRowCell, indexColumnCell, indexRowSubmatrix, indexColumnSubmatrix, checkNumber) {
    for (let i = indexRowSubmatrix * 3; i < (indexRowSubmatrix * 3 + 3) ; i++) {
        for (let j = indexColumnSubmatrix * 3; j < (indexColumnSubmatrix * 3 + 3) ; j++) {
            if (sudokuMatrix[i][j] === checkNumber && sudokuMatrix[indexRowSubmatrix][indexColumnSubmatrix] !== sudokuMatrix[indexRowCell][indexColumnCell]) {
                return true
            }
        }
    }
    return false
};

function isCellEmpty() {

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

            //If cell is empty return the position
            if (sudokuMatrix[i][j] == 0) {
                return {
                    indexRow: i,
                    indexColumn: j
                }
            }
        } 
    }
    return null
};