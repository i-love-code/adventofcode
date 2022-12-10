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

const followHeadPosition = (tail, headMove, headPos, oldHeadPos) => {
    // Determine how far away the head is from the tail, if it's > 2 in any direction, it takes old head position
    const tailHeadXOffset = Math.abs(headPos.x - tail.x)
    const tailHeadYOffset = Math.abs(headPos.y - tail.y)

    const maxOffset = tailHeadXOffset > tailHeadYOffset ? tailHeadXOffset : tailHeadYOffset
    const totalOffset = tailHeadXOffset + tailHeadYOffset

    if (maxOffset == 2 && totalOffset == 3) {
        tail.x = oldHeadPos.x
        tail.y = oldHeadPos.y
    } else if (maxOffset == 2 && totalOffset == 2) {
        moveByOffset(tail, headMove)
    }
}

const trackPosition = (trackedPositions, currPosition, positionUpdater) => {
    // See if position is already tracked
    let matchingTrackedPosition = trackedPositions.find(pos => pos.x == currPosition.x && pos.y == currPosition.y)

    if (matchingTrackedPosition == null) {
        matchingTrackedPosition = { x: currPosition.x, y: currPosition.y, hv: 0, tv: 0 }

        trackedPositions.push(matchingTrackedPosition)
    }

    positionUpdater(matchingTrackedPosition)
}

const printMap = (headPos, tailPos) => {
    const maxY = headPos.y > tailPos.y ? headPos.y : tailPos.y
    const maxX = headPos.x > tailPos.x ? headPos.x : tailPos.x

    console.log(`New Map: `)

    for (let y = maxY; y >= 0; y--) {
        let line = ''

        for (let x = 0; x <= maxX; x++) {
            const headAtPos = x == headPos.x && y == headPos.y
            const tailAtPos = x == tailPos.x && y == tailPos.y

            if (headAtPos && tailAtPos) {
                line += 'B'
            } else if (headAtPos) {
                line += 'H'
            } else if (tailAtPos) {
                line += 'T'
            } else {
                line += '.'
            }
        }

        console.log(line)
    }
}

const HIDE_LOGS = true

HIDE_LOGS && (console.log = () => { })

fileInputHelper.readSplitLines('realInput.txt', moves => {
    moves = parseMoves(moves)
    console.log(`Parsed moves: `, moves)

    let headPosition = { x: 0, y: 0 }
    let tailPosition = { x: 0, y: 0 }

    let trackedPositions = [{ ...headPosition, hv: 1, tv: 1 }]
    const tailTrackingFn = (tp) => { tp.tv += 1 }
    const headTrackingFn = (tp) => { tp.hv += 1 }


    moves.forEach(({ display: moveDisplay, offset: moveOffset }) => {
        const oldHeadPosition = { ...headPosition }
        const oldTailPosition = { ...tailPosition }

        // Move head to new position
        moveByOffset(headPosition, moveOffset)

        // Move tail to accompany new head position
        followHeadPosition(tailPosition, moveOffset, headPosition, oldHeadPosition)

        console.log(`\nMove: `, moveDisplay, `old head `, oldHeadPosition, `old tail`, oldTailPosition, ` new Head: `, headPosition, ` new Tail: `, tailPosition)

        printMap(headPosition, tailPosition)

        trackPosition(trackedPositions, tailPosition, tailTrackingFn)
        trackPosition(trackedPositions, headPosition, headTrackingFn)

        console.log(`\n`)
    })

    const sizeOfTrackedPositions = trackedPositions.reduce(({ maxX, maxY }, tp) => {
        const newMaxX = tp.x > maxX ? tp.x : maxX
        const newMaxY = tp.y > maxY ? tp.y : maxY

        return { maxX: newMaxX, maxY: newMaxY }
    }, { maxX: 0, maxY: 0 })

    // Prints upside down
    console.log(`Historical Tail Positions: `)
    for (let y = sizeOfTrackedPositions.maxY; y >= 0; y--) {
        let line = ''

        for (let x = 0; x < sizeOfTrackedPositions.maxX; x++) {
            const tailTracked = trackedPositions.find(tp => tp.x == x && tp.y == y && tp.tv > 0)
            line += tailTracked ? '#' : '.'
        }

        console.log(line)
    }

    console.info(`Number of tail positions: `, trackedPositions.filter(x => x.tv > 0).length)
})