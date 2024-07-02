

const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;
let playfield;

const TEROMINO_NAMES = [
    'O',
    'L',
    'J',
    'T',
    'I',
    'S',
    'Z'
];

const TEROMINOES = {
    'O' : [
        [1, 1],
        [1, 1]
    ],
    'L' : [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    'J' : [
        [0, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ],
    'T' : [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ],
    'I' : [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
    ],
    'S' : [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    'Z' : [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ]
}

let tetromino = {
    name: '',
    matrix: [],
    column: 0,
    row: 0
}

function convertPositionToIndex(row, col){
    return row * PLAYFIELD_COLUMNS + col;
}

function randomFigure(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function generateTetromino(){
    const nameTetro = randomFigure(TEROMINO_NAMES);
    const matrix = TEROMINOES[nameTetro];

    const columnnTetro = Math.floor(PLAYFIELD_COLUMNS/2 - matrix.length /2);  
    const rowTetro = 5;

    tetromino = {
        name: nameTetro,
        matrix: matrix,
        columnn: columnnTetro,
        row: rowTetro
    }

}

function generatePlayfield(){
    for(let i = 0; i < PLAYFIELD_COLUMNS * PLAYFIELD_ROWS; i++ ){
        const div = document.createElement('div');
        document.querySelector('.tetris').append(div);
    }

    playfield = new Array(PLAYFIELD_ROWS).fill()
                        .map( ()=> new Array(PLAYFIELD_COLUMNS).fill(0) )

    console.table(playfield)

}

function onKeyDown(event){
    console.log(event);
    if (event.key ==  'ArrowLeft') {
        tetromino.column -= 1;
        if (isOutsideOfGamebord(tetromino.row, tetromino.column)) {
            tetromino.column +=1;
        }
    }
    if (event.key ==  'ArrowRight') {
        tetromino.column += 1;
        if (isOutsideOfGamebord(tetromino.row, tetromino.column)) {
            tetromino.column -=1;
        }
    }
    if (event.key ==  'ArrowDown') {
        tetromino.row += 1;
        if (isOutsideOfGamebord(tetromino.row, tetromino.column)) {
            tetromino.row -=1;
        }
    }
    draw();
}

function isOutsideOfGamebord(row, column) {
    return column < 0 || 
           column > PLAYFIELD_COLUMNS - tetromino.matrix.length || 
           row + tetromino.matrix.length > PLAYFIELD_ROWS  - 1;

    
}

function draw() {
    drawPlayfield();
    cells.forEach(el => el.removeAttribute('class'));
    drawTetromino();
}  

function drawTetromino(){
    const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.matrix.length;

    for(let row = 0; row < tetrominoMatrixSize; row++){
        for(let column = 0; column < tetrominoMatrixSize; column++){
            if(!tetromino.matrix[row][column]){ continue }
            const cellIndex = convertPositionToIndex(tetromino.row + row, tetromino.column + column);
            cells[cellIndex].classList.add(name);

        }
    }
}

function drawPlayfield(){
    for( let row = 0; row < PLAYFIELD_ROWS; row++ ){
        for(let column = 0; column < PLAYFIELD_COLUMNS; column++){
            if(!playfield[row][column]) continue;
            const nameFigure = tetromino.name;
            const cellIndex  = convertPositionToIndex(row, column);

            cells[cellIndex].classList.add(nameFigure);
        }
    }
}

generatePlayfield()
let cells = document.querySelectorAll('.tetris div');
generateTetromino()
draw()
