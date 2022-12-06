const inputReader = require('../utils/inputReader')

const getMostCommonCharacterAtPosition = (lines, position) => {
    let sum = 0

    lines.forEach(line => {
        sum += parseInt(line[position])
    })
    
    if(sum == lines.length / 2) {
        return "1"
    } 

    return sum > (lines.length / 2) ? "1" : "0"
}

const getLeastCommonCharacterAtPosition = (lines, position) => {
    let sum = 0

    lines.forEach(line => {
        sum += parseInt(line[position])
    })
    
    
    if(sum == lines.length / 2) {
        return "0"
    } 

    return sum < (lines.length / 2) ? "1" : "0"
}

const recursiveGetFilteredLinesByMethod = (lines, position, bitCriteriaMethod) => {
    const bitCriteriaResult = bitCriteriaMethod(lines, position)
    
    const filteredLines = lines.filter(currLine => currLine[position] == bitCriteriaResult)

    if(filteredLines.length == 1) {
        return filteredLines[0]
    }

    return recursiveGetFilteredLinesByMethod(filteredLines, position + 1, bitCriteriaMethod)
}

inputReader.readLines('day3/input.txt', lines => {
    const diagnosticLength = lines[0].length;

    // Life Support Rating = o2rating * co2 scrubber rating

    // o2rating/co2rating: 
        // full list, "n"th position, get (most/least) common bit, ties goto 1
        // filter lines to ONLY ones that start with (most/least) common bit
        // if it's the number, stop and use that number.
        // otherwise continue w/ filtered list and n+1

    const o2RatingBinary = recursiveGetFilteredLinesByMethod(lines, 0, getMostCommonCharacterAtPosition)
    const co2RatingBinary = recursiveGetFilteredLinesByMethod(lines, 0, getLeastCommonCharacterAtPosition)

    console.log(`O2 Rating: ${o2RatingBinary}, CO2 Rating: ${co2RatingBinary}`)

    const o2RatingValue = parseInt(o2RatingBinary, 2)
    const co2RatingValue = parseInt(co2RatingBinary, 2)

    console.log(`O2 Rating Value: ${o2RatingValue} x CO2 Rating Value: ${co2RatingValue} = ${o2RatingValue * co2RatingValue}`)
})