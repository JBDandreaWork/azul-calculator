// Simple Global Variables
const gridSize = 5;
let tileScore = 0;
let lastGridScore = 0;
const tileOrder = [];

// Creates the grid representing the tiles
const grid = [];
for (let i = 0; i < gridSize; i++) {
    let temp = [];
    for (let j = 0; j < gridSize; j++) {
        temp.push(false);
    }
    grid.push(temp);
}

// Scores a tile by checking its surrounding tiles
function scoreTile(row, col) {
    let score = 0;
    if (grid[row][col]) {
        score++;

        for (let i = 1; i + row < gridSize && grid[i + row][col]; i++) {
            score++;
        }

        for (let i = -1; i + row >= 0 && grid[i + row][col]; i--) {
            score++;
        }

        for (let i = 1; i + col < gridSize && grid[row][i + col]; i++) {
            score++;
        }

        for (let i = -1; i + col >= 0 && grid[row][i + col]; i--) {
            score++;
        }
    }
    return score;
}

// Calculates score for the entire grid;
function calculateScore(rescoreGrid=true) {
    let score = tileScore;

    // Scores tiles and does bonus score for filled rows and columns
    if (rescoreGrid) {
        for (let i = 0; i < gridSize; i++) {
            let rowCheck = true;
            let colCheck = true;
            for (let j = 0; j < gridSize; j++) {
                rowCheck = rowCheck && grid[i][j];
                colCheck = colCheck && grid[j][i];
            }
            if (rowCheck) {
                score += 2;
            }
            if (colCheck) {
                score += 7;
            }
        }

        // Bonus score for all of a color
        for (let i = 0; i < gridSize; i++) {
            let colorCheck = true;
            for (let j = 0; colorCheck && j < gridSize; j++) {
                colorCheck = grid[j][(j + i) % gridSize]; 
            }
            if (colorCheck) {
                score += 10;
            }
        }
        lastGridScore = score;
    } else {
        score = lastGridScore;
    }

    // Subtract from score for broken tiles
    let broken = parseInt(document.querySelector('#broken').value);
    if (broken > 0) {
        score -= broken;
    }

    document.querySelector('#score').innerText = `Final Score: ${score}`;
}

// Sets itself up to handle tile clicks
const tiles = document.querySelectorAll('.tile');
const tileClick = tile => {
    const classes = tile.classList;
    const row = parseInt(tile.id.charAt(1)) - 1;
    const col = parseInt(tile.id.charAt(2)) - 1;
    if (classes.contains('last')) {
        classes.remove('last');
        classes.remove('selected');
        tileScore -= scoreTile(row, col);
        grid[row][col] = false;
        
        tileOrder.pop();
        if (tileOrder.length > 0) {
            document.querySelector(`#${tileOrder[tileOrder.length - 1]}`).classList.add('last');
        }
    } else if (!classes.contains('selected')) {
        classes.add('selected');
        grid[row][col] = true;
        tileScore += scoreTile(row, col);

        if (tileOrder.length > 0) {
            document.querySelector(`#${tileOrder[tileOrder.length - 1]}`).classList.remove('last');
        }
        classes.add('last');
        tileOrder.push(tile.id);
    }
    calculateScore();
};
tiles.forEach(currentValue => currentValue.onclick = () => tileClick(currentValue));

// Set up to update score based on broken tiles
const broken = document.querySelector('#broken');
broken.oninput = () => calculateScore(false);