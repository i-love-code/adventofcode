const inputReader = require('../utils/inputReader')

// Anyone reading this -- it's really not performant. Good luck <3
// Could probably infer this better without actually spawning fish. Mathematically get it based on the number of days

const incrementGridValue = (grid, x, y) => {
    if(grid[y][x] == '.') {
        grid[y][x] = 1
    }
    else {
        grid[y][x] += 1
    }
}

inputReader.readSplitLines('day5/input.txt', lines => {

    let points = lines
        .map(line => {
            const point1String = line[0].split(',')
            const point2String = line[2].split(',')

            return {
                x1: parseInt(point1String[0]),
                y1: parseInt(point1String[1]),
                x2: parseInt(point2String[0]),
                y2: parseInt(point2String[1])
            }
        })

    const gridSize = points.reduce((max, point) => {
        return Math.max(max, point.x1, point.x2, point.y1, point.y2)
    }, 0) + 1
    
    console.log(`Points: ${points.length}`)
    console.log(`Grid Size: ${gridSize}`)

    let grid = Array(gridSize).fill('.').map(()=> Array(gridSize).fill('.'))

    points.forEach((point) => {
        const minX = Math.min(point.x1, point.x2)
        const minY = Math.min(point.y1, point.y2)

        const xdiff = point.x1 - point.x2
        const ydiff = point.y1 - point.y2

        if(Math.abs(xdiff) == Math.abs(ydiff)) {
            const xDesc = point.x2 < point.x1
            const yDesc = point.y2 < point.y1
            
            console.log(`Point is ${point.x1},${point.y1} => ${point.x2},${point.y2}, moving diagonally`)

            // Diagonal
            let x = point.x1
            let y = point.y1

            do
            {
                console.log(`Moving across ${x},${y} diagonally`)
                incrementGridValue(grid, x, y)

                xDesc ? x-- : x++
                yDesc ? y-- : y++
            }
            while (x !== point.x2 && y !== point.y2)

            console.log(`Moving across ${point.x2},${point.y2} diagonally`)
            incrementGridValue(grid, point.x2, point.y2)
        } else if (ydiff == 0) {
            console.log(`Point is ${point.x1},${point.y1} => ${point.x2},${point.y2}, moving horizontally`)
            
            const y = minY
            for(let i = 0; i <= Math.abs(xdiff); i++) {
                const x = minX + i

                console.log(`Moving across ${x},${y} horizontally`)
                incrementGridValue(grid, x, y)
            }
        } else if (xdiff == 0) {
            console.log(`Point is ${point.x1},${point.y1} => ${point.x2},${point.y2}, moving vertically`)

            const x = minX
            for(let i = 0; i <= Math.abs(ydiff); i++) {
                const y = minY + i

                console.log(`Moving across ${x},${i} vertically`)
                incrementGridValue(grid, x, y)
            }
        }
    })

    // Print Grid
    grid.forEach(gridRow => console.log(gridRow.join('')))

    // Find where 2 or larger points overlap
    const pointsWithTwoOverlaps = grid.reduce((sum, gridRow) => {
        const colTotals = gridRow.reduce((colSum, gridCol) => {
            if(typeof gridCol === 'number' && gridCol >= 2) return colSum+1

            return colSum
        }, 0)

        return sum + colTotals
    }, 0)

    console.log(`Points with two overlapping lines: ${pointsWithTwoOverlaps}`)
})