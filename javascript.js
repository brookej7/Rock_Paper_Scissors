const WIN = 1;
const LOSE = 0;
const DRAW = 2;

let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
    let number = Math.floor(Math.random()*3) + 1;
    let choice;

    switch(number){
        case 1:
            choice = "rock";
            break;
        case 2:
            choice = "paper";
            break;
        case 3:
            choice = "scissors";
            break;

    }

    return choice
}

function toSentenceCase(word) {
    let end = word.slice(1)
    let start = word.at(0).toUpperCase()
    return start+end
}

function playRound(playerSelection, computerSelection=getComputerChoice()){

    playerSelection = playerSelection.toLowerCase()

    tieMessage = "It's a tie. Try again."
    winMessage = `You Win! ${toSentenceCase(playerSelection)} beats ${toSentenceCase(computerSelection)}.`
    loseMessage = `You Lose! ${toSentenceCase(computerSelection)} beats ${toSentenceCase(playerSelection)}.`

    if (playerSelection == computerSelection) {
        return [DRAW, tieMessage];
    } else if (playerSelection == "scissors") {
        switch (computerSelection) {
            case "rock":
                return [LOSE, loseMessage]
            case "paper":
                return [WIN, winMessage]
        }
    } else if (playerSelection == "paper") {
        switch (computerSelection) {
            case "scissors":
                return [LOSE, loseMessage]
            case "rock":
                return [WIN, winMessage]
        }
    } else if (playerSelection == "rock") {
        switch (computerSelection) {
            case "paper":
                return [LOSE, loseMessage]
            case "scissors":
                return [WIN, winMessage]
        }
    }

}

const results = document.querySelector(".Results");

function playGame(playerChoice) {
    const newResult = document.createElement("p");
    let outcomes = playRound(playerChoice);
    newResult.setAttribute("class", "roundOutcome");
    newResult.textContent = outcomes[1];
    results.appendChild(newResult);

    updateScore(outcomes[0]);

    checkWinner();

}

function updateScore(outcome) {

    switch (outcome) {
        case WIN:
            playerScore += 1;
            playerScorePlaceholder.textContent = playerScore.toString()
            computerScorePlaceholder.textContent = computerScore.toString()
            break
        
        case LOSE:
            computerScore += 1;
            computerScorePlaceholder.textContent = computerScore.toString()
            playerScorePlaceholder.textContent = playerScore.toString()
            break;

        case DRAW:
            playerScore += 1;
            playerScorePlaceholder.textContent = playerScore.toString()
            computerScore += 1;
            computerScorePlaceholder.textContent = computerScore.toString()
            break;
    }
    
    
}

function checkWinner () {
    let winner = false;
    let message = "";
    if (playerScore == 5 & computerScore == 5) {
        winner = DRAW;
        message = "It's a draw. You and the computer won 5 rounds."
    }
    else if (playerScore == 5) {
        winner = WIN;
        message = "You have won! You got 5 round wins first."
    } else if (computerScore == 5) {
        winner = LOSE;
        message = "You have lost! The computer 5 round wins first."

    } else {
        
        const messageToRemove = document.querySelectorAll("#GameDoneMessage");
        messageToRemove.forEach((message) => {
            scoreboard.removeChild(message);
        });
        return;
    }
    const gamesOutcomes = document.createElement("h2");
    gamesOutcomes.setAttribute("id", "GameDoneMessage");
    gamesOutcomes.textContent = message;
    scoreboard.appendChild(gamesOutcomes);

    //Reset scores
    playerScore = 0;
    computerScore = 0;

    const gameResults = document.querySelectorAll(".roundOutcome");
    
    gameResults.forEach((game) => {
        results.removeChild(game);
    });
}

const buttons = document.querySelectorAll("button");
const playerScorePlaceholder = document.querySelector(".player .score");
const computerScorePlaceholder = document.querySelector(".computer .score");
const scoreboard = document.querySelector(".Scoreboard");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        playGame(button.id);
    });
});
