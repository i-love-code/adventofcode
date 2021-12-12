const inputReader = require('../utils/inputReader')

inputReader.readCommaDelimitedLines('day7/input.txt', lines => {
    const input = lines[0].map(line => parseInt(line))

    console.log(`Input ${input}`)

    const maxInput = Math.max(...input)

    const getMinFuel = (input, position) => {
        const min = input
            .map(startPos => Math.abs(startPos - position))
            .reduce((prevTotal, diff) => {
                let fuelCost = 0

                for(let i = 1; i <= diff; i++) {
                    fuelCost += i
                }

                // console.log(`Fuel cost for diff ${diff}: ${fuelCost}`)

                return prevTotal + fuelCost
            }, 0)

        console.log(`Fuel for position ${position} = ${min}`)

        return min
    }

    let minFuel = getMinFuel(input, 0)

    for (let i = 1; i < maxInput; i++) {
        const min = getMinFuel(input, i)

        min < minFuel && (minFuel = min)
    }

    console.log(`Min fuel: ${minFuel}`)
})