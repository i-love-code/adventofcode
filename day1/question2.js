const fileInputHelper = require('../utils/inputReader')

fileInputHelper.readNumberPerLine('input.txt', (lines) => {
    let measurementWindows = [];

    for(var x=0, y=1, z=2; z < lines.length; x+=1, y+=1, z+=1) {
        console.log(`Reading lines ${x}, ${y}, ${z}`)

        const totalMeasurement = lines[x] + lines[y] + lines[z];

        measurementWindows.push(totalMeasurement / 3)
    }

    let numIncreasingDepths = 0;

    for(var i = 1; i < measurementWindows.length; i++) {
        if(measurementWindows[i] > measurementWindows[i-1]) {
            numIncreasingDepths += 1;
        }
    }

    console.log(`Found ${lines.length} lines making up ${measurementWindows.length} measurement windows, ${numIncreasingDepths} increasing windows.`)
})