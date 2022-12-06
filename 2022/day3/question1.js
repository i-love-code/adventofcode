const fileInputHelper = require('../../utils/inputReader')

const toPriority = (item) => {
    const unicodeValue = item.charCodeAt(0);

    // a unicode = 97
    // a prio = 1
    if (unicodeValue >= 97) return (unicodeValue - 96);

    // A unicode = 65
    // A prio = 27
    return (unicodeValue - 38);
}

fileInputHelper.readLines('realInput.txt', (rucksacks) => {
    const duplicateItemSets = rucksacks.map((rucksack, index) => {
        const compartment1 = rucksack.slice(0, rucksack.length / 2);
        const compartment2 = rucksack.slice(rucksack.length / 2, rucksack.length);

        const compartment1Array = compartment1.split('');
        const compartment2Array = compartment2.split('');

        const intersection = compartment1Array.filter(item => compartment2Array.includes(item))

        console.log(`Rucksack #${index}: ${rucksack} (${compartment1}|${compartment2}) -> intersection ${intersection}`)

        return intersection.filter((val, index, self) => self.indexOf(val) === index)
    })

    console.log(`Rucksack duplicate contents: `, duplicateItemSets)

    const prioritiesOfDuplicateItems = duplicateItemSets.map((duplicateItems, index) => {
        console.log(`Duplicate items #${index} -> ${duplicateItems}`)

        return toPriority(duplicateItems[0]);
    })

    console.log(`Priorities of duplicate items: ${prioritiesOfDuplicateItems}`)

    const totalPriorities = prioritiesOfDuplicateItems.reduce((total, val) => total + val, 0);

    console.log(`Sum of duplicated items:`, totalPriorities)
})