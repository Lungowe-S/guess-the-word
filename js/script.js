// The unordered list where the guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters")
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

guessButton.addEventListener("click", e => {
    e.preventDefault()
    const inputValue = letterInput.value
    console.log(inputValue)
    if (inputValue !== "") {
        letterInput.value = ""
    }
})
