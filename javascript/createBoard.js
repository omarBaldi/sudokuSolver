export default class SudokuBoard {
    constructor(sudokuMatrix) {
        this.sudokuBoard = document.getElementById('sudokuBoard');
        this.sudokuMatrix = sudokuMatrix;
        this.availableNumbersSudoku = null;
        this.arrowsSudoku = null;
        this.indexActiveCell = 0;
    }
    init() {
        this.availableNumbersSudoku = this.createNumbersArray(49, 57);
        this.arrowsSudoku = this.createNumbersArray(37, 40);

        this.createDOMboard();
        this.setActiveCell();
        this.onButtonClicked();
    }
    setActiveCell(currentIndex = 0) {
        const activeBox = document.querySelectorAll('.sudokuColumn')[currentIndex];
        activeBox.classList.add('boxClicked');
        this.indexActiveCell = currentIndex;
    }
    getActiveCell() {
        return document.querySelector('.sudokuColumn.boxClicked');
    }
    createDOMboard() {
        this.sudokuMatrix.forEach(sudokuRow => {
            const row = document.createElement('div');
            row.className = 'sudokuRow';
            sudokuRow.forEach(() => {
                const col = document.createElement('div');
                col.className = 'sudokuColumn';
                row.appendChild(col)
            });
            this.sudokuBoard.appendChild(row);
        });
    }
    removeActiveBoardClass() {
        const sudokuBoxes = document.querySelectorAll('.sudokuColumn');
        sudokuBoxes.forEach(box => {
            if (box.classList.contains('boxClicked')) {
                box.classList.remove('boxClicked');
            }
        })
    }
    onButtonClicked() {
        window.addEventListener('keydown', (e) => {

            //if is a number (from 0 to 9)
            if (this.availableNumbersSudoku.includes(Number(e.keyCode))) {
                const currentActiveCell = this.getActiveCell();
                currentActiveCell.innerText = e.key;
            } 

            //if is an arrow button
            else if (this.arrowsSudoku.includes(Number(e.keyCode))) {

                switch(e.keyCode) {
                    case(37):
                        //Left
                        this.indexActiveCell > 0 ? this.indexActiveCell -= 1 : null;
                        break;
                    case(38):
                        //Up
                        this.indexActiveCell >= 9 ? this.indexActiveCell -= 9 : null;
                        break;
                    case(39):
                        //Right
                        this.indexActiveCell < 80 ? this.indexActiveCell += 1 : null;
                        break;
                    case(40):
                        //Down
                        this.indexActiveCell <= 71 ? this.indexActiveCell += 9 : null;
                        break;
                }

                //Remove current active cell
                this.removeActiveBoardClass();

                //Set class active to new cell
                document.querySelectorAll('.sudokuColumn')[this.indexActiveCell].classList.add('boxClicked');

            } 
            //Delete number
            else if (Number(e.keyCode) == 8) {
                const currentActiveCell = this.getActiveCell();
                currentActiveCell.innerText = null;
            }
            else {
                console.log("Button NOT valid!")
            }
        });
    }
    createNumbersArray(start, end) {
        return Array(end - start + 1).fill().map((_, number) => start + number);
    }
}