const fileInputHelper = require('../../utils/inputReader')

const OPPONENT_ROCK = 'A';
const OPPONENT_PAPER = 'B';
const OPPONENT_SCISSORS = 'C';

const YOUR_ROCK = 'X';
const YOUR_PAPER = 'Y';
const YOUR_SCISSORS = 'Z';

const getOutcomeScore = (yourChoice, opponentChoice) => {
    switch (yourChoice) {
        case YOUR_ROCK:
            switch (opponentChoice) {
                case OPPONENT_ROCK: return 3;
                case OPPONENT_PAPER: return 0;
                case OPPONENT_SCISSORS: return 6;
            }
        case YOUR_PAPER:
            switch (opponentChoice) {
                case OPPONENT_ROCK: return 6;
                case OPPONENT_PAPER: return 3;
                case OPPONENT_SCISSORS: return 0;
            }
        case YOUR_SCISSORS:
            switch (opponentChoice) {
                case OPPONENT_ROCK: return 0;
                case OPPONENT_PAPER: return 6;
                case OPPONENT_SCISSORS: return 3;
            }
    }
}

const getThrowScore = (yourChoice) => {
    switch (yourChoice) {
        case YOUR_ROCK:
            return 1;
        case YOUR_PAPER:
            return 2;
        case YOUR_SCISSORS:
            return 3;
    }
}

const getRoundScore = (yourChoice, opponentChoice) => {
    const throwScore = getThrowScore(yourChoice);
    const outcomeScore = getOutcomeScore(yourChoice, opponentChoice);

    console.log(`Your throw: ${yourChoice} -> Throw score: ${throwScore}`)
    console.log(`Game outcome score: ${yourChoice}`)

    return throwScore + outcomeScore;
}

fileInputHelper.readSplitLines('realInput.txt', (games) => {
    console.log(`Inputs: `, games)

    const roundScores = games.map((game, index) => {
        console.log(`Game #${index}: `, game)
        const yourChoice = game[1];
        const opponentChoice = game[0];

        return getRoundScore(yourChoice, opponentChoice);
    })

    console.log(`Round scores: `, roundScores);

    const totalScore = roundScores.reduce((total, newVal) => total + newVal, 0);
    console.log(`Total score after ${games.length} games: ${totalScore}`)
})