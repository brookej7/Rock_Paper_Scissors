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

    if(playerSelection == null) {
        return "Oops Invalid Input Try Again"
    }
    playerSelection = playerSelection.toLowerCase()

    tieMessage = "It's a tie. Try again."
    winMessage = `You Win! ${toSentenceCase(playerSelection)} beats ${toSentenceCase(computerSelection)}.`
    loseMessage = `You Lose! ${toSentenceCase(computerSelection)} beats ${toSentenceCase(playerSelection)}.`

    if (playerSelection == computerSelection) {
        return tieMessage;
    } else if (playerSelection == "scissors") {
        switch (computerSelection) {
            case "rock":
                return loseMessage
            case "paper":
                return winMessage
        }
    } else if (playerSelection == "paper") {
        switch (computerSelection) {
            case "scissors":
                return loseMessage
            case "rock":
                return winMessage
        }
    } else if (playerSelection == "rock") {
        switch (computerSelection) {
            case "paper":
                return loseMessage
            case "scissors":
                return winMessage
        }
    }

    return "Oops Invalid Input Try Again"
}

const results = document.querySelector(".Results");

function playGame(playerChoice) {
    const newResult = document.createElement("p");
    newResult.textContent = playRound(playerChoice);
    results.appendChild(newResult);

}

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        playGame(button.id);
    });
});
