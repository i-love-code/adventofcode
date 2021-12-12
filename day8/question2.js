const inputReader = require('../utils/inputReader')

// acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf
//   8       5     2     3    7    9      6     4     0    1    

//          A (in 7, not in 1) --> d
//          7-length without 4 --> 0, which means f --> d

//          A & B --> C & F
//          E & F --> B & D
//          

const doesNotIncludeAnyOf = (testTarget, testCharacters, desiredMatches) => {
    return testTarget.split('').filter(testCh => testCharacters.includes(testCh)).length == desiredMatches
}

const getJumbledMatchIndex = (input, options) => {
    const matchingOption = options.filter(option => input.length == option.length && input.split('').filter(x => option.includes(x)).length == input.length)

    return options.indexOf(matchingOption[0])
}

inputReader.readSplitLines('day8/input.txt', displays => {
    displays = displays.map(display => {
        return {
            signals: display.slice(0, 10),
            output: display.slice(11, 15)
        }
    })

    const outputValueTotal = displays.reduce((prevTotal, display) => {
        let finalNumbers = Array(10)

        const one = display.signals.filter(x => x.length == 2)[0]
        const oneArr = one.split('')
        finalNumbers[1] = one

        const four = display.signals.filter(x => x.length == 4)[0]
        const fourArr = four.split('')
        finalNumbers[4] = four

        const seven = display.signals.filter(x => x.length == 3)[0]
        const sevenArr = seven.split('')
        finalNumbers[7] = seven

        const eight = display.signals.filter(x => x.length == 7)[0]
        const eightArr = eight.split('')
        finalNumbers[8] = eight

        // A comes from what's in 7, but not in 1
        const segmentA = sevenArr.filter(ch => !oneArr.includes(ch))[0]

        // B and D segments are what is "new" to 4 compared to 1
        const bdPossibilities = fourArr.filter(x => !oneArr.includes(x))

        // Find the 6-letter that does not include either B or D
        const zero = display.signals.filter(x => doesNotIncludeAnyOf(x, bdPossibilities, 1)).filter(x => x.length == 6)[0]
        finalNumbers[0] = zero

        // D segment is what's missing from 0 that 4 has
        const segmentD = fourArr.filter(frCh => !zero.includes(frCh))[0]

        // B segment is what's in four that isnt in 1 or D
        const segmentB = fourArr.filter(frCh => !one.includes(frCh) && frCh !== segmentD)[0]

        // 3 is a 5-letter with (NO B segment) & C & F
        const three = display.signals.filter(x => x.length == 5 && !x.includes(segmentB) && x.includes(one[0]) && x.includes(one[1]))[0]
        finalNumbers[3] = three

        // 5 is remaining 5-characters (minus 3) that has Bsegment
        const five = display.signals.filter(x => x.length == 5 && x.includes(segmentB))[0]
        finalNumbers[5] = five

        // 2 is the remaining 5-character (not 3/5)
        const two = display.signals.filter(x => x.length == 5 && x != three && x != five)[0]
        finalNumbers[2] = two

        // 9 is the 6-segment that is not 0 and has "1" characters
        const nine = display.signals.filter(x => x.length == 6 && x != zero && x.includes(one[0]) && x.includes(one[1]))[0]
        finalNumbers[9] = nine

        // 6 is the 6-segment that is not 0 or 9
        const six = display.signals.filter(x => x.length == 6 && x != zero && x != nine)[0]
        finalNumbers[6] = six

        // Get the output values using the known numbers
        let outputValue = display.output.reduce((numString, output) => numString + getJumbledMatchIndex(output, finalNumbers), '')

        console.log(`Display total: ${outputValue}`)

        return prevTotal + parseInt(outputValue)
    }, 0)

    console.log(`Summed up value: ${outputValueTotal}`)
})