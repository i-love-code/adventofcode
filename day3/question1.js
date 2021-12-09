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

inputReader.readSplitLines('day3/input.txt', lines => {
    const diagnosticLength = lines[0][0].length;

    let binaryGammaValue = ""
    
    for(let position = 0; position < diagnosticLength; position++) {
        binaryGammaValue += getMostCommonBitInPosition(lines, position, "1", "0", undefined)
    }

    const gammaValue = parseInt(binaryGammaValue, 2)

    console.log(`Binary Gamma Value: ${binaryGammaValue} aka ${gammaValue}`)
    
    let binaryEpsilonValue = ""
    
    for(let position = 0; position < diagnosticLength; position++) {
        binaryEpsilonValue += getMostCommonBitInPosition(lines, position, "0", "1", undefined)
    }

    const epsilonValue = parseInt(binaryEpsilonValue, 2)

    console.log(`Epsilon Gamma Value: ${binaryEpsilonValue} aka ${epsilonValue}`)

    console.log(`Power Consumption: ${gammaValue * epsilonValue}`)
})
