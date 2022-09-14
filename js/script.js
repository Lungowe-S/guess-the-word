// The unordered list where the guessed letters will appear
const guessedLettersList = document.querySelector(".guessed-letters")
// The guess button
const guessButton = document.querySelector(".guess")
// The text input where the guessed letter will appear
const letterInput = document.querySelector(".letter")
// The paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress")
// The paragraph where the remaining guesses will appear
const remainingGuesses = document.querySelector(".remaining")
//  The span where the remaining guesses will display
const remainingGuessesDisplay = document.querySelector(".remaining span")
// The area where messages will appear when the player guesses a game
const messages = document.querySelector(".message")
// The hidden button requesting the player to play again
const playAgainButton = document.querySelector(".play-again")
// First word to guess
const word = "magnolia"
// Player guesses
const guessedLetters = []


// Function to add a placeholder for each letter
const updateWords = (word) => {
    const wordArray = []
    for (const letter of word) {
        wordArray.push("●")
        //console.log(wordArray)
    }
    wordInProgress.textContent = wordArray.join("")
}

updateWords(word)

// Click event on the guess button
guessButton.addEventListener("click", e => {
    e.preventDefault()
    const inputValue = letterInput.value
    //console.log(inputValue)
    if (inputValue !== "") {
        letterInput.value = "" // Clear the input after the button is clicked
    }

    messages.textContent = "" // Clear the message after entering another input
    const goodGuess = checkPlayerInput(inputValue)

    if (goodGuess) {
        makeGuess(inputValue)
    }
    //console.log(inputValue)
})

// Function to check player's input
const checkPlayerInput = (inputValue) => {
    //Accepted letter sequence
    const acceptedLetter = /[a-zA-Z]/
    
    //Check different input scenarios
    if (inputValue === "") {
        messages.textContent = `Oops looks like you need to enter a letter`
    } else if (inputValue.length > 1) {
        messages.textContent = `Please enter one letter only, thanks!`
    } else if (!inputValue.match(acceptedLetter)) {
        messages.textContent = `Please enter a letter from A - Z`
    }

    return inputValue
}

// Function to capture input 
const makeGuess = (inputValue) => {
    const inputUppercase = inputValue.toUpperCase()
    if (guessedLetters.includes(inputUppercase)) {
        messages.textContent = `You've already guessed that letter`
    } else {
        guessedLetters.push(inputUppercase)
    }
    console.log(guessedLetters)
}
