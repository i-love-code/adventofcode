const fileInputHelper = require('../../utils/inputReader')

const NUM_SIGNIFICANT_CHARACTERS = 14

fileInputHelper.readLines('realInput.txt', lines => {
    const signal = lines[0].split('')

    for (let pos = NUM_SIGNIFICANT_CHARACTERS; pos < signal.length; pos++) {
        const prevSigChars = signal.slice(pos - NUM_SIGNIFICANT_CHARACTERS, pos)

        console.log(`Processing position #${pos}, previous ${NUM_SIGNIFICANT_CHARACTERS} ${prevSigChars}`)

        const dupes = prevSigChars.filter((char, selfIndex) => prevSigChars.indexOf(char) != selfIndex)

        if (dupes == 0) {
            console.log(`Signal found at position ${pos} with prev${NUM_SIGNIFICANT_CHARACTERS} ${prevSigChars}`)
            break
        }
    }
})