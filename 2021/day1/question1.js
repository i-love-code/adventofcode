const fileInputHelper = require('../utils/inputReader')

fileInputHelper.readNumberPerLine('input.txt', (lines) => {
    let numIncreasingDepths = 0;

    for (var i = 1; i < lines.length; i++) {
        const lastDepth = lines[i - 1];
        const depth = lines[i];

        if (depth > lastDepth) {
            numIncreasingDepths += 1;
        }
    }

    console.log(`Found ${numIncreasingDepths} increasing depths from ${lines.length} depths.`)
})