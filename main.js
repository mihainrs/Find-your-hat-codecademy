const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        // referencing the field
        this.field = field;
    }

    toString() {
        return this.field.map(row => row.join('')).join('\n');
    }
}

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

let pRow = 0;
let pCol = 0;

console.log(myField.toString());

// movement
function playerMovement(movement) {
    //Clearplayer position from field
    myField.field[pRow][pCol] = '░';

    if (movement === "up" && pRow > 0) {
        pRow--;
    } else if (movement === "down" && pRow < 2) {
        pRow++;
    } else if (movement === "left" && pCol > 0) {
        pCol--;
    } else if (movement === "right" && pCol < 2) {
        pCol++;
    } else console.log('Can\'t move there!');

    //Check player's position
    if (myField.field[pRow][pCol] === '^') {
        console.log('You win! :D ');
        let retry = prompt('Play again? (yes/no): ');
        again(retry);
    } else if (myField.field[pRow][pCol] === 'O') {
        console.log('You lose! :( ');
        let retry = prompt('Play again? (yes/no): ');
        again(retry);
    } else {
        myField.field[pRow][pCol] = '*';
    }
    console.log(myField.toString());
}

//handling reset logic
function again(retry) {
    if (retry === 'yes') {
        myField.field = resetField();
        pRow = 0;
        pCol = 0;
        console.log("\nNew Game Starting...\n");
        console.log(myField.toString());
    } else if (retry === 'no') {
        console.log('Game Over! D:');
        process.exit();
    }
}

function resetField() {
    // reset the field to original 
    return [
        ['*', '░', 'O'],
        ['░', 'O', '░'],
        ['░', '^', '░'],
    ];
}

// game loop
while (true) {
    const movement = prompt('Which direction are you heading? up, down, left or right?: ')
    playerMovement(movement);
}
