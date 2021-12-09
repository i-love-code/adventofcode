const inputReader = require('../utils/inputReader')

const getMostCommonBitInPosition = (lines, position, oneMostCommon, zeroMostCommon, tied) => {
    let sum = 0;

    for(let i = 0; i < lines.length; i++) {
        sum += parseInt(lines[i][0][position])
    }
    
    const midGround = lines.length / 2;

    if (sum > midGround)
        return oneMostCommon
    else if (sum < midGround)
        return zeroMostCommon

    return tied
}

const recursiveGetCommonBit = (lines, startPosition, stopPosition, oneMostCommon, zeroMostCommon, tied) => {
    let returnVal = getMostCommonBitInPosition(lines, startPosition, oneMostCommon, zeroMostCommon, tied)

    if(startPosition == stopPosition)
        return returnVal

    return recursiveGetCommonBit(lines, startPosition+1, stopPosition, oneMostCommon, zeroMostCommon, tied)
}

inputReader.readSplitLines('day3/input.txt', lines => {
    const diagnosticLength = lines[0][0].length;

    const mostCommonBitAtZero = getMostCommonBitInPosition(lines, 0, "1", "0", "1")

    // Oxygen Generator Rating
    // Most common bit in pos0, if tie use "1"
    const oxygenRatingLines = lines.filter(line => line[0][0] == mostCommonBitAtZero)
    console.log(`${oxygenRatingLines.length} Oxygen Rating lines`, oxygenRatingLines)

    const binaryOxygenRating = recursiveGetCommonBit(oxygenRatingLines, 1, diagnosticLength-1, "1", "0", "1")
    const oxygenRating = parseInt(binaryOxygenRating, 2)
    console.log(`Binary Oxygen Rating ${binaryOxygenRating} aka ${oxygenRating}`)

    const leastCommonBitAtZero = getMostCommonBitInPosition(lines, 0, "0", "1", "0")

    // CO2 Scrubber Rating
    // Least common bit in pos0, if tied use "0"
    const scrubberRatingLines = lines.filter(line => line[0][0] == leastCommonBitAtZero)
    console.log(`${scrubberRatingLines.length} CO2 Scrubber Rating lines`, scrubberRatingLines)

    const binaryScrubberRating = recursiveGetCommonBit(scrubberRatingLines, 1, diagnosticLength-1, "0", "1", "0")
    const scrubberRating = parseInt(binaryScrubberRating, 2)
    console.log(`CO2 Scrubber Rating ${binaryScrubberRating} aka ${scrubberRating}`)
})
