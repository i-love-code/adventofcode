const fileInputHelper = require('../../utils/inputReader')

const directionToOffset = (direction) => {
    switch (direction) {
        case 'R':
            return { x: 1, y: 0 }
        case 'L':
            return { x: -1, y: 0 }
        case 'U':
            return { x: 0, y: 1 }
        case 'D':
            return { x: 0, y: -1 }
    }
}

const parseMoves = (moves) => {
    return moves.map(move => {
        const direction = move[0]
        const distance = move[1]
        const offset = directionToOffset(direction)
        let parsedMoves = []

        // A move line could turn into a series of moves
        for (let moveIndex = 0; moveIndex < distance; moveIndex++) {
            parsedMoves.push({ display: `${direction}=>1`, offset })
        }

        return parsedMoves
    }).flat()
}

const moveByOffset = (currPos, offset) => {
    offset.x !== 0 && (currPos.x += offset.x)
    offset.y !== 0 && (currPos.y += offset.y)
}

const getMoveFromOffset = (offset) => {
    if (offset == 0) return 0
    else if (offset > 0) return 1
    else if (offset < 0) return -1
}

const followPosition = (knotIndex, posToMove, followedPos, oldFollowedPos) => {

    // Determine how far away the head is from the tail, if it's > 2 in any direction, it takes old head position
    const xOffset = followedPos.x - posToMove.x
    const yOffset = followedPos.y - posToMove.y

    const absXOffset = Math.abs(xOffset)
    const absYOffset = Math.abs(yOffset)

    const maxOffset = absXOffset > absYOffset ? absXOffset : absYOffset
    const totalOffset = absXOffset + absYOffset

    console.debug(`Knot #${knotIndex}: c`, posToMove, `trying to follow `, oldFollowedPos, `that moved to `, followedPos)

    if (maxOffset == 1) {
        // Do nothing, it's in a fine spot.
        console.debug(`Knot #${knotIndex} ignoring move, because offset: {${xOffset}, ${yOffset}}`)
    } else if (totalOffset >= 3) {
        const diagonalMove = {
            x: absXOffset == 2 ? (xOffset > 0 ? 1 : -1) : xOffset,
            y: absYOffset == 2 ? (yOffset > 0 ? 1 : -1) : yOffset
        }

        console.debug(`Knot #${knotIndex} diagonal move`, diagonalMove)

        moveByOffset(posToMove, diagonalMove)
    } else if (maxOffset == 2 && totalOffset == 2) {
        const catchUpMove = {
            x: getMoveFromOffset(xOffset),
            y: getMoveFromOffset(yOffset)
        }

        console.debug(`Knot #${knotIndex} making move`, catchUpMove)
        moveByOffset(posToMove, catchUpMove)
    }
}

const trackPosition = (trackedPositions, currPosition, positionUpdater) => {
    // See if position is already tracked
    let matchingTrackedPosition = trackedPositions.find(pos => pos.x == currPosition.x && pos.y == currPosition.y)

    if (matchingTrackedPosition == null) {
        matchingTrackedPosition = { x: currPosition.x, y: currPosition.y, knotsVisited: new Array(10).fill(0) }

        trackedPositions.push(matchingTrackedPosition)
    }

    positionUpdater(matchingTrackedPosition)
}

const printMap = (knots) => {
    const maxX = knots.reduce((max, knot) => knot.x > max ? knot.x : max, 0)
    const maxY = knots.reduce((max, knot) => knot.y > max ? knot.y : max, 0)
    const minX = knots.reduce((max, knot) => knot.x < max ? knot.x : max, 0)
    const minY = knots.reduce((max, knot) => knot.y < max ? knot.y : max, 0)

    console.info(`\nMap after move:`)

    for (let y = maxY; y >= minY; y--) {
        let line = ''

        for (let x = minX; x <= maxX; x++) {
            const knotsAtPos = knots.map((knot, i) => ((knot.x == x && knot.y == y) ? i : -1)).filter(kv => kv >= 0)

            if (x == 0 && y == 0) {
                line += 's'
            } else if (knotsAtPos.includes(0)) {
                line += 'H'
            } else if (knotsAtPos.includes(knots.length - 1)) {
                line += 'T'
            } else if (knotsAtPos.length > 1) {
                line += 'M'
            } else if (knotsAtPos.length == 1) {
                line += knotsAtPos[0]
            } else {
                line += '.'
            }
        }

        console.info(line)
    }
}

const printTailLocations = (trackedPositions, numKnots) => {
    const sizeOfTrackedPositions = trackedPositions.reduce(({ maxX, maxY, minX, minY }, tp) => {
        const newMaxX = tp.x > maxX ? tp.x : maxX
        const newMaxY = tp.y > maxY ? tp.y : maxY
        const newMinX = tp.x < minX ? tp.x : minX
        const newMinY = tp.y < minY ? tp.y : minY

        return { maxX: newMaxX, maxY: newMaxY, minX: newMinX, minY: newMinY }
    }, { maxX: 0, minX: 0, maxY: 0, minY: 0 })

    console.debug(`\nHistorical Tail Positions: `)
    for (let y = sizeOfTrackedPositions.maxY; y >= sizeOfTrackedPositions.minY; y--) {
        let line = ''

        for (let x = sizeOfTrackedPositions.minX; x <= sizeOfTrackedPositions.maxX; x++) {
            const tailTracked = trackedPositions.find(tp => tp.x == x && tp.y == y && tp.knotsVisited[numKnots - 1] > 0)

            if (x == 0 && y == 0) {
                line += 's'
            } else {
                line += tailTracked ? '#' : '.'
            }
        }

        console.debug(line)
    }
}

const HIDE_LOGS = true

HIDE_LOGS && (console.debug = () => { }) && (console.info = () => { })

const NUM_KNOTS = 10

fileInputHelper.readSplitLines('realInput.txt', moves => {
    moves = parseMoves(moves)
    console.info(`Parsed moves: `, moves)

    let knots = new Array(NUM_KNOTS).fill('').map(_ => { return { x: 0, y: 0 } })

    let trackedPositions = [{ x: 0, y: 0, knotsVisited: new Array(NUM_KNOTS).fill(0) }]

    moves.forEach(({ display: moveDisplay, offset: moveOffset }, moveIndex) => {
        console.warn(`\nExecuting move #${moveIndex} of ${moves.length}: `, moveDisplay)

        let head = knots[0]
        const oldHead = { ...knots[0] }
        const oldPositions = knots.map(knot => ({ ...knot }))

        moveByOffset(head, moveOffset)
        // console.debug(`Head moved from `, oldHead, 'to', head)

        for (let knotIndex = 1; knotIndex < knots.length; knotIndex++) {
            let posToMove = knots[knotIndex]
            let posToFollow = knots[knotIndex - 1]
            const oldFollowedPos = oldPositions[knotIndex - 1]

            // Move knot to accompany new previous knot position
            followPosition(knotIndex, posToMove, posToFollow, oldFollowedPos)

        }

        trackPosition(trackedPositions, knots[NUM_KNOTS - 1], (tp) => { tp.knotsVisited[NUM_KNOTS - 1] += 1 })

        // printMap(knots)
        // printTailLocations(trackedPositions, NUM_KNOTS)
    })

    console.log(`\n`)

    // Prints upside down
    printTailLocations(trackedPositions, NUM_KNOTS)

    const tailPositions = trackedPositions.filter(tp => tp.knotsVisited[NUM_KNOTS - 1] > 0)
    console.error(`Number of tail positions: `, tailPositions.length)
})