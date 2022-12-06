const inputReader = require('../utils/inputReader')

const NUMBERS = ['abcefg', 'cf', 'acdeg', 'acdfg', 'bcdf', 'abdfg', 'abdfg', 'acf', 'abcdefg', 'abcdfg']
const ONE_FOUR_SEVEN_EIGHT = ['cf', 'bcdf', 'acf', 'abcdefg']

inputReader.readSplitLines('day8/input.txt', displays => {
    displays = displays.map(display => {
        return {
            signals: display.slice(0, 9),
            output: display.slice(11, 15)
        }
    })

    let numOneFourSevenEight = displays.reduce((total, display) => {
        return total + display.output.filter(x => x.length == 2 || x.length == 3 || x.length == 4 || x.length == 7).length
    }, 0)

    console.log(`Number of 1/4/7/8: ${numOneFourSevenEight}`)
})