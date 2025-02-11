const blocks = [
    {
        array: [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
        ],
        colour: 'yellow',
        piece_name: 'oh'
    },
       
    {
        array: [
        [0,0,1,0],
        [0,0,1,0],
        [0,1,1,0],
        [0,0,0,0]
        ],
        colour: 'blue',
        piece_name: 'jay'
    },
    {
        array: [
       [0,1,0,0],
       [0,1,0,0],
       [0,1,1,0],
       [0,0,0,0]
        ],
        colour: 'orange',
        piece_name: 'elle'
    },
       
    {
        array: [
        [0,0,0,0],
        [0,0,1,1],
        [0,1,1,0],
        [0,0,0,0]
        ],
        colour: 'green',
        piece_name: 'ess'
    },
    {
        array: [
        [0,0,0,0],
        [0,1,1,1],
        [0,0,1,0],
        [0,0,0,0]
        ],
        colour: 'purple',
        piece_name: 'tee'
    },
    {
        array: [
        [0,0,0,0],
        [1,1,0,0],
        [0,1,1,0],
        [0,0,0,0]
        ],
        colour: 'red',
        piece_name: 'zed'
    },
       
    {
        array: [
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0]
        ],
        colour: 'cyan',
        piece_name: 'eye'
    },

]

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 40; //
const canvas = document.getElementById("gameCanvas") 
const cxt = canvas.getContext("2d")
const z_key = 90
const up_key = 38
const left_arrow = 37
const right_arrow = 39
const down_arrow = 40
//CONSTANTS


let gridMatrix = getEmptygameCanvas(); 
let raf = null;
let block = generateBlock();


cxt.canvas.width = COLS * BLOCK_SIZE;
cxt.canvas.height = ROWS * BLOCK_SIZE;
//CALCULATE WIDTH AND HEIGHT OF CANVAS FROM CONSTANTS
const width = cxt.canvas.width;
const height = cxt.canvas.height;

//cxt.scale(width, height)

function getEmptygameCanvas(){
    let matrix = [];
    for (let i=0; i<ROWS; i++) {
        matrix[i] = [];
        for (let j=0; j<COLS; j++) {
            matrix[i][j]=0;
            cxt.fillStyle = 0;
            cxt.fillRect(j*BLOCK_SIZE, i*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
        }
    }
    return matrix;
}

function setBlock(){
    const blockRow = block.row;
    const blockColumn = block.column;
    const blockArray = block.array;
    const blockColour = block.colour;

    for (let row=0; row<blockArray.length; row++){
        for (let column=0; column<row.length; column++){
            const cell = blockArray[row][column];
            if (cell === 1){
                gridMatrix[blockRow+row][blockColumn+column] = blockColour;
            }
        }
    }
    block = generateBlock();
}


//GENERATES GAME CANVAS GRID
let counter = 0;
let holdGridMatrix = getEmptyholdCanvas();

function getEmptyholdCanvas(){
    let holdMatrix = [];
    for (let x=0; x<4; x++) {
        holdMatrix[x] = [];
        for (let y=0; y<4; y++) {
            holdMatrix[x][y]=0;
            cxt.fillStyle = 0;
            cxt.fillRect(y*BLOCK_SIZE, x*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
        }
    }
    return holdMatrix
}


let nextGridMatrix = getEmptynextCanvas();

function getEmptynextCanvas(){
    let nextMatrix = [];
    for (let x=0; x<12; x++) {
        nextMatrix[x] = [];
        for (let y=0; y<4; y++) {
            nextMatrix[x][y]=0;
            cxt.fillStyle = 0;
            cxt.fillRect(y*BLOCK_SIZE, x*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
        }
    }
    return nextMatrix
}

function generateBlock(){
    let randomNumber = Math.floor(Math.random()*7);
    const randomBlock = blocks[randomNumber]
    return {array: randomBlock.array,
    colour: randomBlock.colour,
    row: -1,
    column: 5}
}

function clockwise_rotate(arr){
   const newarray = arr[0].map((val, index) => arr.map(row => row[index]).reverse());
   return newarray;
   }
    
function anti_rotate(arr){
    const newarray = arr[0].map((val, index) => arr.map(row => row[row.length-1-index]));
    return newarray;
    }
        
window.onkeydown = function(rotate){
    if (rotate.keyCode === up_key) {
        block.array = clockwise_rotate(block.array)
    }
    else if (rotate.keyCode === z_key) {
        block.array = anti_rotate(block.array)
    }
    }

// create main game function
function game(){
    raf = requestAnimationFrame(game);
    // remake game canvas
    cxt.clearRect(0,0,width,height);
    //draw fixed blocks
    for (let i=0; i<ROWS; i++) {
        for (let j=0; j<COLS; j++) {
            if (gridMatrix[i][j] !== 0) {
                cxt.fillStyle = gridMatrix[i][j];
                cxt.fillRect(j*BLOCK_SIZE, i*BLOCK_SIZE, BLOCK_SIZE-0.5, BLOCK_SIZE-0.5)
            }
        }
    }
    //move block down
    counter++;
    if (counter > 100){
        counter=0;
        block.row++;
    }
    //fill block in play
    for (let row=0; row<block.array.length; row++) {
        for (let col=0; col<block.array[row].length; col++) {
            if (block.array[row][col] !== 0){
                cxt.fillStyle = block.colour;
                cxt.fillRect((block.column+col)*BLOCK_SIZE, (block.row+row)*BLOCK_SIZE, BLOCK_SIZE-0.5, BLOCK_SIZE-0.5)
            }
        }
    }
}

window.onkeydown = function(move){
    if (move.keyCode === left_arrow) {
        block.column--;
    }
    if (move.keyCode === right_arrow) {
        block.column++;
    }
    if (move.keyCode === down_arrow) {
        block.row++;
    }
    if (move.keyCode === up_key) {
        block.array = clockwise_rotate(block.array)
    }
    if (move.keyCode === z_key) {
        block.array = anti_rotate(block.array)
    }
}
raf = requestAnimationFrame(game);