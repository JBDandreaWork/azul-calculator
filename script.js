// Creates the grid representing the tiles
const grid = [];
for (let i = 0; i < 5; i++) {
    let temp = [];
    for (let j = 0; j < 5; j++) {
        temp.push(false);
    }
    grid.push(temp);
}

// Sets itself up to handle tile clicks
const tiles = document.querySelectorAll('.tile');
const tileClick = tile => {
    const classes = tile.classList;
    if (classes.contains('selected')) {
        classes.remove('selected');
    } else {
        classes.add('selected');
    }
    calculateScore();
};
tiles.forEach(currentValue => currentValue.onclick = () => tileClick(currentValue));

function calculateScore() {
    let score = 0;
}