const inputReader = require('../utils/inputReader')

let cache = {}

const getNumberOfSpawns = (spawnTimer, daysRemaining) => {
    if(daysRemaining <= spawnTimer)
        return 0

    const cacheKey = `${spawnTimer}-${daysRemaining}`
    
    if(cache[cacheKey])
        return cache[cacheKey]

    const spawns = 1 + getNumberOfSpawns(7, daysRemaining - spawnTimer) + getNumberOfSpawns(9, daysRemaining - spawnTimer)

    cache[`${spawnTimer}-${daysRemaining}`] = spawns

    return spawns
}

inputReader.readCommaDelimitedLines('day6/input.txt', lines => {
    // Example: [3, 4, 3, 1, 2]
    let fishes = lines[0].map(strNum => parseInt(strNum))
    const numDays = 256

    console.log(`Starting fish: ${fishes}`)

    let fishCount = fishes.reduce((total, fish) => total + getNumberOfSpawns(fish, numDays), fishes.length)

    console.log(`After ${numDays} days, total: ${fishCount}`)
})