const die1 = document.querySelector(".die-1");
const die2 = document.querySelector(".die-2");
const balance = document.querySelector(".balance-display");
const betInput = document.querySelector("#bet");
const rollBtn = document.querySelector(".roll-btn");
const message = document.querySelector("h3");

let rollCount = 0;
let currentBalance = 100.0;
let currentPoint, currentBet;


// Main game logic
function calculateScore() {
    let roll1 = Math.floor(Math.random() * 6) + 1;
    let roll2 = Math.floor(Math.random() * 6) + 1;
    let total = roll1 + roll2;

    die1.src = `../img/${roll1}.png`;
    die2.src = `../img/${roll2}.png`;

    if (rollCount == 1) {
        switch (total) {
            case 7:
            case 11:
                winGame(); // 7 or 11 is a win
                break;
            case 2:
            case 3:
            case 12:
                loseGame(); // 2, 3, or 12 is a loss
                break;
            case 4:
            case 5:
            case 6:
            case 8:
            case 9:
            case 10:
                currentPoint = total; // Set 'point' if 4,5,6,8,9, or 10 is rolled
                message.textContent = `Point is ${currentPoint}`;
                break;
        }
    } else {
        if (total == 7) {
            loseGame();
        } else if (total == currentPoint) {
            winGame();
        }
    }
}

// Win game helper function
function winGame() {
    message.textContent = 'You win!';
    rollCount = 0;
    currentBalance += currentBet;
    currentBet = 0;
    betInput.value = '';
    balance.textContent = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(currentBalance);
}

// Lose game helper function
function loseGame() {
    message.textContent = 'You lose!';
    rollCount = 0;
    currentBalance -= currentBet;
    currentBet = 0;
    betInput.value = '';
    balance.textContent = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(currentBalance);
    if (currentBalance <= 0) message.textContent = 'Game Over! You ran out of money.';
}

// Roll button logic
rollBtn.addEventListener("click", () => {
    // Validate the betInput value
    if (!betInput.value || !Number(betInput.value)) {
        alert('Enter a valid number');
        betInput.value = '';
        return;
    } else if (Number(betInput.value) > currentBalance) {
        alert('Insufficient balance');
        betInput.value = '';
        return;
    } else {
        currentBet = Number(betInput.value);
    }

    // Check rollCount and set message text
    if (rollCount === 0) {
        message.textContent = 'Enter a bet to begin.'
    }

    rollCount++;
    calculateScore();
});
