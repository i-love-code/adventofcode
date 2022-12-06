const fileInputHelper = require('../../utils/inputReader')

fileInputHelper.readLineArraysWithBlankSeparator('realInput.txt', (elves) => {
    console.log(`Found ${elves.length} elves`)

    const elfCalories = elves.map((elf, index) => {
        console.log(`Elf #${index}: `, elf)
        const foodItems = elf.map(calorieCount => parseInt(calorieCount));

        return foodItems.reduce((total, foodItem) => total + foodItem, 0);
    })

    const sortedCalories = elfCalories.sort((a, b) => b - a);

    console.log(`Sorted calories:`, sortedCalories)

    const top3Elves = sortedCalories.slice(0, 3);

    console.log(`Top 3 elves: `, top3Elves)

    console.log(top3Elves.reduce((total, newValue) => total + newValue, 0))
})
