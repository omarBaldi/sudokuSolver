import createSudokuBoard from './createBoard.js';
import { resolveSudoku, clearCells } from './functionsSudoku.js';

//Create Board
const matrix = [...Array(9).fill().map(() => Array(9).fill(0))];
new createSudokuBoard(matrix).init();

//Clear all Cells
const buttonClear = document.getElementById('buttonClear');
buttonClear.addEventListener('click', () => clearCells());

//Resolve Sudoku
const buttonResolve = document.getElementById('buttonResolve');
buttonResolve.addEventListener('click', () => {

    const sudokuCells = document.querySelectorAll('.sudokuColumn');
    const finalSudokuBoard = resolveSudoku();
    let indexCells = 1;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            
            if (sudokuCells[indexCells].innerText.trim().length == 0) {
                sudokuCells[indexCells].innerText = finalSudokuBoard[i][j];
                sudokuCells[indexCells].classList.add('solution');
            }
            indexCells += 1;
        }
    }
});