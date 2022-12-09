const fileInputHelper = require('../../utils/inputReader')

const getNumVisibleTrees = (treeHeight, otherTrees) => {
    const blockingTree = otherTrees.find(otherTree => otherTree >= treeHeight)

    const visibleRange = blockingTree != null ? (otherTrees.indexOf(blockingTree) + 1) : otherTrees.length

    return visibleRange
}

fileInputHelper.readLines('realInput.txt', forestRows => {
    const forestHeight = forestRows.length;
    const forestWidth = forestRows[0].length;
    let eligibleTrees = []

    forestRows = forestRows.map(row => row.split('').map(tree => parseInt(tree)))

    console.log(`Forest: `, forestRows)

    forestRows.forEach((forestRow, rowIndex) => {
        forestRow.forEach((treeHeight, columnIndex) => {
            const treeDescription = {
                height: treeHeight,
                xy: [rowIndex, columnIndex],
            }

            if (rowIndex == 0 || rowIndex == (forestWidth - 1) || columnIndex == 0 || columnIndex == (forestHeight - 1)) {
                // We no longer care about external row trees
                return
            }

            const treeColumn = forestRows.map(row => row[columnIndex])

            const treesToLeft = forestRow.slice(0, columnIndex).reverse()
            const treesToRight = forestRow.slice(columnIndex + 1, forestWidth)
            const treesAbove = treeColumn.slice(0, rowIndex).reverse()
            const treesBelow = treeColumn.slice(rowIndex + 1, forestHeight)

            const scoreLeft = getNumVisibleTrees(treeHeight, treesToLeft)
            const scoreRight = getNumVisibleTrees(treeHeight, treesToRight)
            const scoreTop = getNumVisibleTrees(treeHeight, treesAbove)
            const scoreBottom = getNumVisibleTrees(treeHeight, treesBelow)

            eligibleTrees.push({
                ...treeDescription,
                nearby: {
                    left: treesToLeft,
                    right: treesToRight,
                    top: treesAbove,
                    bottom: treesBelow
                },
                score: {
                    left: scoreLeft,
                    right: scoreRight,
                    top: scoreTop,
                    bottom: scoreBottom,
                    total: scoreLeft * scoreRight * scoreTop * scoreBottom
                }
            })
        })
    })

    const sortedTrees = eligibleTrees.sort((tree1, tree2) => tree2.score.total - tree1.score.total)

    console.log(`Best tree: `, sortedTrees[0])
})