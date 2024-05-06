// Main container

// The unordered list where the guessed letters will appear
const guessedLettersList = document.querySelector(".guessed-letters")

// The guess button
const guessButton = document.querySelector(".guess")

// The text input where the guessed letter will appear
const letterInput = document.querySelector(".letter")

// The paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress")

// The paragraph where the remaining guesses will appear
const guessesRemaining = document.querySelector(".remaining")

//  The span where the remaining guesses will display
const remainingGuessesDisplay = document.querySelector(".remaining span")

// The area where messages will appear when the player guesses a game
const messages = document.querySelector(".message")

// The hidden button requesting the player to play again
const playAgainButton = document.querySelector(".play-again")

// First word to guess
let word = "magnolia"

// Player guesses
let guessedLetters = []

// The variable for the number of guesses
let remainingGuesses = 8

async function getWord() {
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt")
    const words = await request.text()
    const wordsArray = words.split("\n")
    const randomIndex = Math.floor(Math.random() * wordsArray.length)
    word = wordsArray[randomIndex].trim()
    updateWords(word)
}

getWord()

// Function to add a placeholder for each letter
const updateWords = (word) => {
    const wordArray = []
    for (const letter of word) {
        wordArray.push("●")
    }
    wordInProgress.textContent = wordArray.join("")
}

//updateWords(word)

// Click event on the guess button
guessButton.addEventListener("click", e => {
    e.preventDefault()
    const inputValue = letterInput.value
    if (inputValue !== "") {
        letterInput.value = "" // Clear the input after the button is clicked
    }

    messages.textContent = "" // Clear the message after entering another input
    const goodGuess = checkPlayerInput(inputValue)

    if (goodGuess) {
        makeGuess(inputValue)
    }
})

// Function to check player's input
const checkPlayerInput = (inputValue) => {
    //Accepted letter sequence
    const acceptedLetter = /[a-zA-Z]/
    
    //Check different input scenarios
    if (inputValue === "") {
        messages.textContent = `Oops looks like you need to enter a letter`
        return false
    } 
    
    if (inputValue.length > 1) {
        messages.textContent = `Please enter one letter only, thanks!`
        return false
    } 
    
    if (!inputValue.match(acceptedLetter)) {
        messages.textContent = `Please enter a letter from A - Z`
        return false
    } 
    
    console.log(inputValue.length)
    return true
}

// Function to capture input 
const makeGuess = (inputValue) => {
    const inputUppercase = inputValue.toUpperCase()
    if (guessedLetters.includes(inputUppercase)) {
        messages.textContent = `You've already guessed that letter`
    } else {
        guessedLetters.push(inputUppercase)
        displayGuessedLetter()
        guessCount(inputValue)
        wordInProgressUpdate(guessedLetters)
    }
}

// Function to show guessed letters
const displayGuessedLetter = () => {
    guessedLettersList.innerHTML = ""
    for (const letter of guessedLetters) {
        const listItem = document.createElement("li")
        listItem.textContent = letter
        guessedLettersList.append(listItem)
    }
}

// Function to update word in progress
const wordInProgressUpdate = (guessedLetters) => {
    const wordUpper = word.toUpperCase()
    const wordArray = wordUpper.split("")
    const updatedLetter = []
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            updatedLetter.push(letter.toUpperCase())
            //wordInProgress.textContent = wordArray.join("")
        } else {
            updatedLetter.push("●")
        }
    }
    wordInProgress.textContent = updatedLetter.join("")
    winGame() 
}

// Function to count guesses remaining
const guessCount = (inputValue) => {
    const wordInUpperCase = word.toUpperCase()
    const letterUpperCase = inputValue.toUpperCase()
    if (!wordInUpperCase.includes(letterUpperCase)) {
        messages.textContent = `Sorry, the word does not contain ${inputValue}!`
        remainingGuesses -= 1
    } else {
        messages.textContent = `Yes! It does contain that letter`
    }

    if (remainingGuesses === 0) {
        messages.textContent = `Awww, game over! The correct word was ${wordInUpperCase}`
        startOver()
    } else if (remainingGuesses === 1) {
        remainingGuessesDisplay.textContent = `${remainingGuesses} guess`
    } else {
        remainingGuessesDisplay.textContent = `${remainingGuesses} guesses`
    }
}

// Function to check if the player won
const winGame = () => {
    if (word.toUpperCase() === wordInProgress.textContent) {
        messages.classList.add("win")
        messages.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`
        startOver()
    }
}

// Function to hide and show elements
const startOver = () => {
    guessButton.classList.add("hide")
    guessesRemaining.classList.add("hide")
    guessedLettersList.classList.add("hide")
    playAgainButton.classList.remove("hide")
}

// Click event on the Play Again Button
playAgainButton.addEventListener("click", e => {
    messages.classList.remove("win")
    messages.textContent = ""
    guessedLettersList.innerHTML = ""
    remainingGuesses = 8
    guessedLetters = []
    getWord()
    remainingGuessesDisplay.textContent = `${remainingGuesses} guesses`
    guessButton.classList.remove("hide")
    guessesRemaining.classList.remove("hide")
    guessedLettersList.classList.remove("hide")
    playAgainButton.classList.add("hide")
})