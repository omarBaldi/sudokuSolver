import createSudokuBoard from './createBoard.js';

//Create Board
const matrix = [...Array(9).fill().map(() => Array(9).fill(0))];
new createSudokuBoard(matrix).init();