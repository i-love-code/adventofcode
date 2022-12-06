const fileInputHelper = require('../../utils/inputReader')

fileInputHelper.readLineArraysWithBlankSeparator('realInput.txt', (elves) => {
    console.log(`Found ${elves.length} elves`)

    const elfCalories = elves.map((elf, index) => {
        console.log(`Elf #${index}: `, elf)
        const foodItems = elf.map(calorieCount => parseInt(calorieCount));

        return foodItems.reduce((total, foodItem) => total + foodItem, 0);
    })

    const sortedCalories = elfCalories.sort((a, b) => a - b);

    console.log(`Sorted calories:`, sortedCalories)

    const mostCalories = sortedCalories[sortedCalories.length - 1];

    console.log(`Elf with most calories has ${mostCalories} calories`)
})
