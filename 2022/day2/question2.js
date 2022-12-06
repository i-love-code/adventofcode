const fileInputHelper = require('../../utils/inputReader')

const OPPONENT_ROCK = 'A';
const OPPONENT_PAPER = 'B';
const OPPONENT_SCISSORS = 'C';

const OUTCOME_LOSE = 'X';
const OUTCOME_DRAW = 'Y';
const OUTCOME_WIN = 'Z';

const SCORE_ROCK = 1;
const SCORE_PAPER = 2;
const SCORE_SCISSORS = 3;

const getOutcomeScore = (desiredOutcome) => {
    switch (desiredOutcome) {
        case OUTCOME_DRAW: return 3;
        case OUTCOME_LOSE: return 0;
        case OUTCOME_WIN: return 6;
    }
}

const getThrowScore = (opponentChoice, desiredOutcome) => {
    switch (opponentChoice) {
        case OPPONENT_ROCK:
            switch (desiredOutcome) {
                case OUTCOME_WIN: return SCORE_PAPER;
                case OUTCOME_DRAW: return SCORE_ROCK;
                case OUTCOME_LOSE: return SCORE_SCISSORS;
            }
        case OPPONENT_PAPER:
            switch (desiredOutcome) {
                case OUTCOME_WIN: return SCORE_SCISSORS;
                case OUTCOME_DRAW: return SCORE_PAPER;
                case OUTCOME_LOSE: return SCORE_ROCK;
            }
        case OPPONENT_SCISSORS:
            switch (desiredOutcome) {
                case OUTCOME_WIN: return SCORE_ROCK;
                case OUTCOME_DRAW: return SCORE_SCISSORS;
                case OUTCOME_LOSE: return SCORE_PAPER;
            }
    }
}

const getRoundScore = (opponentChoice, desiredOutcome) => {
    const throwScore = getThrowScore(opponentChoice, desiredOutcome);
    const outcomeScore = getOutcomeScore(desiredOutcome);

    console.log(`Opponent throws: ${opponentChoice} -> Throw score: ${throwScore}, Outcome score: ${outcomeScore}`)

    return throwScore + outcomeScore;
}

fileInputHelper.readSplitLines('realInput.txt', (games) => {
    console.log(`Inputs: `, games)

    const roundScores = games.map((game, index) => {
        console.log(`Game #${index}: `, game)

        const opponentChoice = game[0];
        const desiredOutcome = game[1];

        return getRoundScore(opponentChoice, desiredOutcome);
    })

    console.log(`Round scores: `, roundScores);

    const totalScore = roundScores.reduce((total, newVal) => total + newVal, 0);
    console.log(`Total score after ${games.length} games: ${totalScore}`)
})