const inputReader = require('../utils/inputReader')

const getWinningBoards = (boards) => {
    return boards.filter(boardRows => {
        const winningRows = boardRows.filter(boardNumbers => boardNumbers.filter(boardNumber => boardNumber.marked).length == 5)

        if (winningRows.length) {
            return true
        }

        for (let col = 0; col < 5; col++) {
            let markedColumns = 0

            for (let row = 0; row < 5; row++) {
                if (boardRows[row][col].marked)
                    markedColumns++
            }

            if (markedColumns == 5)
                return true
        }

        return false
    })
}

const buildBoards = (lines) => {
    let boards = []

    let lineNumber = 1
    for (let boardNumber = 0; lineNumber < lines.length; boardNumber++, lineNumber += 5) {
        let board = []

        for (let i = 0; i < 5; i++) {
            const line = lines[lineNumber + i]

            board[i] = line.map(x => {
                return {
                    number: parseInt(x),
                    marked: false
                }
            })
        }

        boards.push(board)
    }
    return boards
}

const markBoardsWithDrawnNumber = (boards, drawnNumber) => {
    boards.forEach((boardRows, boardIndex) => {
        boardRows.forEach((boardColumn, columnIndex) => {
            boardColumn.forEach((boardNumber, numberIndex) => {
                if (boardNumber.number == drawnNumber) {
                    boardNumber.marked = true
                    console.log(`Found ${drawnNumber} match on board ${boardIndex} at (${columnIndex}, ${numberIndex})`)
                }
            })
        })
    })
}

const notifyWinningBoard = (winningBoard, drawNumber) => {
    // Determine sum of all unmarked numbers, multiplied by the sum of drawNumber
    console.log(`Found winning board: `, winningBoard)

    let boardTotal = 0

    winningBoard.forEach(boardRow => {
        boardRow.forEach(boardNumber => {
            if (!boardNumber.marked) {
                boardTotal += boardNumber.number
            }
        })
    }, 0)

    console.log(`All unmarked board numbers sum: ${boardTotal}`)
    console.log(`All board numbers x drawn number (${drawNumber}): ${boardTotal * drawNumber}`)
}

inputReader.readSplitLines('day4/input.txt', lines => {
    lines = lines.map(argArr => argArr.filter(x => x.length != 0)).filter(x => x.length != 0)

    const drawNumbers = lines[0][0].split(',').map(x => parseInt(x))

    let boards = buildBoards(lines)

    console.log(`Found ${boards.length} boards`)

    console.log(`Drawing Numbers`)

    for (let i = 0; i < drawNumbers.length; i++) {
        const drawnNumber = drawNumbers[i]

        markBoardsWithDrawnNumber(boards, drawnNumber)

        const winningBoards = getWinningBoards(boards)

        if (winningBoards.length) {
            if (boards.length == 1) {
                notifyWinningBoard(winningBoards[0], drawnNumber)
                break
            }

            // Remove winning boards
            boards = boards.filter(x => !winningBoards.includes(x))
        }
    }
})