/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if lose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = 2,
    guessesLeft = 3;

// UI elements
const gameWrapper = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Show min and max values in UI (assign to minNum & maxNum)
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess on guessBtn(submit button)
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value); // the input value will be a string. We need it to be a number, so need to parse it into a number
    console.log(guess);

    // Validate: Check if input is within range
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if winning number
    if (guess === winningNum) {
        // Game over - Won
        gameOver(true, `${winningNum} is correct, You win!`);
    } else {
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // Game over - Lost
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}.`, 'red');
        } else {
            // Game continues - answer wrong
            // Change border colot + set message
            guessInput.style.borderColor = 'red';
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, "red");
            // Clear Input
            guessInput.value = '';
        }
    }

});

// Play again Event Listener
gameWrapper.addEventListener('mousedown', function (e) {
    // Event delegation
    if(e.target.className === 'play-again'){
        // reload the page
        window.location.reload();
    }
});

// Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable input + Change border & msg text color + set message
    guessInput.disable = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg);

    // Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
    // Since this class is added after the page loads, we need
    // to use Event Delegation - add a listener on the parent
    // and search for our target.
}

function setMessage(msg, color) {
    // set message color 
    message.style.color = color;
    // output into the <p class='message'></p> ->v message variable
    message.textContent = msg;
}
