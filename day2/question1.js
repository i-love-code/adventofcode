const inputReader = require('../utils/inputReader')

inputReader.readSplitLines('input.txt', (commands) => {
    let parsedCommands = []

    commands.forEach(commandArguments => {
        parsedCommands.push({
            command: commandArguments[0],
            amount: parseInt(commandArguments[1])
        })
    });

    console.log(`Found ${parsedCommands} commands`, parsedCommands)

    let position = { x: 0, y: 0 }

    parsedCommands.forEach(({ command, amount }) => {
        switch(command) {
            case 'forward':
                position.x+=amount
                break
            case 'down':
                position.y+=amount
                break
            case 'up':
                position.y-=amount
                break
            default:
                console.error(`Unable to parse command ${command},${amount}`)
        }
    })

    console.log(`Final position: ${position}, x*y = ${position.x * position.y}`)
})