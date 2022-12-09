const fileInputHelper = require('../../utils/inputReader')

fileInputHelper.readLines('realInput.txt', forestRows => {
    const forestHeight = forestRows.length;
    const forestWidth = forestRows[0].length;
    let visibleTrees = []

    forestRows = forestRows.map(row => row.split('').map(tree => parseInt(tree)))

    console.log(`Forest: `, forestRows)

    forestRows.forEach((forestRow, rowIndex) => {
        forestRow.forEach((treeHeight, columnIndex) => {
            const treeDescription = {
                height: treeHeight,
                xy: [rowIndex, columnIndex],
            }

            if (rowIndex == 0 || rowIndex == (forestWidth - 1) || columnIndex == 0 || columnIndex == (forestHeight - 1)) {
                visibleTrees.push({ ...treeDescription })
                return
            }

            const treeColumn = forestRows.map(row => row[columnIndex])

            const treesToLeft = forestRow.slice(0, columnIndex)
            const treesToRight = forestRow.slice(columnIndex + 1, forestWidth)
            const treesAbove = treeColumn.slice(0, rowIndex)
            const treesBelow = treeColumn.slice(rowIndex + 1, forestHeight)

            console.log(`Evaluating tree at Row#${rowIndex} Column#${columnIndex}. Height: ${treeHeight}`)
            console.log(`Trees left: ${treesToLeft} -- right: ${treesToRight}`)
            console.log(`Trees top: ${treesAbove} -- bottom: ${treesBelow}`)

            const visibleFromLeft = treesToLeft.every((otherTree) => otherTree < treeHeight)
            const visibleFromRight = treesToRight.every((otherTree) => otherTree < treeHeight)
            const visibleFromTop = treesAbove.every((otherTree) => otherTree < treeHeight)
            const visibleFromBottom = treesBelow.every((otherTree) => otherTree < treeHeight)

            let directions = ``

            visibleFromLeft && (directions += `(left)`)
            visibleFromRight && (directions += `(right)`)
            visibleFromTop && (directions += `(top)`)
            visibleFromBottom && (directions += `(bottom)`)

            if (visibleFromLeft || visibleFromRight || visibleFromTop || visibleFromBottom) {
                visibleTrees.push({ ...treeDescription, directions })
            }
        })
    })

    console.log(`Visible Trees: `, visibleTrees)
    console.log(`Number of visible trees: `, visibleTrees.length)
})