const inputReader = require('../utils/inputReader')


/*
    Each bit in the gamma rate can be determined by finding the most common bit
    in the corresponding position of all numbers in the diagnostic report

            00100
            11110
            10110
            10111
            10101
            01111
            00111
            11100
            10000
            11001
            00010
            01010

    GAMMA:  10110  == 22
*/

const getMostCommonCharacterAtPosition = (lines, position) => {
    let sum = 0

    lines.forEach(line => {
        sum += parseInt(line[position])
    })
    
    return sum > (lines.length / 2) ? "1" : "0"
}

const getLeastCommonCharacterAtPosition = (lines, position) => {
    let sum = 0

    lines.forEach(line => {
        sum += parseInt(line[position])
    })
    
    return sum < (lines.length / 2) ? "1" : "0"
}

inputReader.readLines('day3/input.txt', allLines => {
    const lengthOfBinary = allLines[0].length

    let gammaRate = ""
    let epsilonRate = ""

    for(let characterIndex = 0; characterIndex < lengthOfBinary; characterIndex++){
        const mostCommonCharacter = getMostCommonCharacterAtPosition(allLines, characterIndex)
        const leastCommonCharacter = getLeastCommonCharacterAtPosition(allLines, characterIndex)
        
        // console.log(`The most common character at ${characterIndex} is: ${mostCommonCharacter}`)
        console.log(`The least common character at ${characterIndex} is: ${leastCommonCharacter}`)

        gammaRate += mostCommonCharacter
        epsilonRate += leastCommonCharacter
    }

    console.log(`Gamma Rate Binary: ${gammaRate}`)
    console.log(`Gamma Rate: ${parseInt(gammaRate, 2)}`)
    
    console.log(`Epsilon Rate Binary: ${epsilonRate}`)
    console.log(`Epsilon Rate: ${parseInt(epsilonRate, 2)}`)

    console.log(`Power Consumption: ${parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)}`)
})


