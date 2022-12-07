const fileInputHelper = require('../../utils/inputReader')

const CAN_MOVE_MULTIPLE_CRATES = true // change this to false for part1 answer

const parseCratePositions = (lines) => {
    const reversed = lines.reverse()
    const columnIndexes = reversed[0]
    const numStacks = columnIndexes.replaceAll(/[^0-9]/g, '').length
    const inputCratePositions = reversed.slice(1, reversed.length)

    let outputPositions = []
    for (let col = 1; col <= numStacks; col++) {
        const charPos = columnIndexes.indexOf(col)

        const parsedCrates = inputCratePositions.map(inputLine => inputLine.at(charPos)).filter(x => x != ' ')
        outputPositions.push(parsedCrates)
    }

    return outputPositions
}

fileInputHelper.readLineArraysWithBlankSeparator('realInput.txt', lineArrays => {
    console.log(`Raw input: `, lineArrays)

    let cratePositions = parseCratePositions(lineArrays[0])

    const crateMovementActions = lineArrays[1].map(movementAction => {
        const regexMatch = movementAction.match(/([a-z ]+)([0-9]+)([a-z ]+)([0-9]+)([a-z ]+)([0-9]+)/)

        return {
            from: parseInt(regexMatch[4]) - 1,
            to: parseInt(regexMatch[6]) - 1,
            count: parseInt(regexMatch[2])
        }
    })

    console.log(`Crate Positions: `, cratePositions)
    console.log(`Crate Movements (translated -1): `, crateMovementActions)

    crateMovementActions.forEach(crateMovement => {
        const { from, to, count } = crateMovement

        console.log(`Moving ${count} crates from ${from + 1}[${cratePositions[from]}] to ${to + 1}[${cratePositions[to]}]`)

        const sourceStack = cratePositions[from]
        const cratesBeingMoved = sourceStack.slice(sourceStack.length - count, sourceStack.length)

        const newCrateOrder = CAN_MOVE_MULTIPLE_CRATES ? cratesBeingMoved : cratesBeingMoved.reverse()

        cratePositions[to] = [...cratePositions[to], ...newCrateOrder]
        cratePositions[from] = cratePositions[from].slice(0, cratePositions[from].length - count)

        console.log(`After moving,        ${from + 1}[${cratePositions[from]}] and ${to + 1}[${cratePositions[to]}]`)
    })

    console.log(`After all moves, crate stacks: `, cratePositions)
    console.log(`Item on top of each stack: `, cratePositions.map(x => x[x.length - 1]).join(''))
})