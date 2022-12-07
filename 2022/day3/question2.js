const fileInputHelper = require('../../utils/inputReader')
const { evenlySplitString } = require('../../utils/arrayHelpers')

const NUM_ELVES = 3;

const getItemPriority = (item) => {
    const unicodeValue = item.charCodeAt(0);

    // a unicode = 97
    // a prio = 1
    if (unicodeValue >= 97) return (unicodeValue - 96);

    // A unicode = 65
    // A prio = 27
    return (unicodeValue - 38);
}

fileInputHelper.readLines('realInput.txt', (rucksacks) => {
    console.log(`Number of rucksacks:`, rucksacks.length)

    let groupBadges = []

    for (let i = 0; i < rucksacks.length; i += 3) {
        const rucksackLabel = `Rucksack set {${i}..${i + 3}}`
        const rucksackSet = rucksacks.slice(i, i + 3).map(sack => sack.split(''))

        const otherRucksacks = rucksackSet.slice(1, 3)

        const itemInCommon = rucksackSet[0].filter(item => otherRucksacks.every(otherRucksack => otherRucksack.includes(item)))[0]

        groupBadges.push(itemInCommon)
    }

    const badgePrios = groupBadges.map(badgeItem => getItemPriority(badgeItem))
    const totalPriority = badgePrios.reduce((total, val) => total + val, 0)

    console.log(`Badges: ${groupBadges} have total priority: ${badgePrios.join('+')}=${totalPriority}`)
})