// Creates the grid representing the tiles
const gridSize = 5;
const grid = [];
for (let i = 0; i < gridSize; i++) {
    let temp = [];
    for (let j = 0; j < gridSize; j++) {
        temp.push(false);
    }
    grid.push(temp);
}

// Sets itself up to handle tile clicks
const tiles = document.querySelectorAll('.tile');
const tileClick = tile => {
    const classes = tile.classList;
    const row = parseInt(tile.id.charAt(1)) - 1;
    const col = parseInt(tile.id.charAt(2)) - 1;
    if (classes.contains('selected')) {
        classes.remove('selected');
        grid[row][col] = false;
    } else {
        classes.add('selected');
        grid[row][col] = true;
    }
    calculateScore();
};
tiles.forEach(currentValue => currentValue.onclick = () => tileClick(currentValue));

function scoreTile(row, col) {
    let score = 0;
    if (grid[row][col]) {
        score++;

        for (let i = 1; i + row < gridSize && grid[i + row][col]; i++) {
            score++;
        }

        for (let i = 1; i + col < gridSize && grid[row][i + col]; i++) {
            score++;
        }
    }
    return score;
}

function calculateScore() {
    let score = 0;

    // Scores tiles and does bonus score for filled rows and columns
    for (let i = 0; i < gridSize; i++) {
        let rowCheck = true;
        let colCheck = true;
        for (let j = 0; j < gridSize; j++) {
            score += scoreTile(i, j);
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

    document.querySelector('h2').innerText = `Final Score: ${score}`;
}