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

    let position = { x: 0, y: 0, aim: 0 }

    parsedCommands.forEach(({ command, amount }) => {
        switch(command) {
            case 'forward':
                position.x+=amount
                position.y+=(position.aim * amount)
                break
            case 'down':
                position.aim+=amount
                break
            case 'up':
                position.aim-=amount
                break
            default:
                console.error(`Unable to parse command ${command},${amount}`)
        }
    })

    console.log(`Final position: (${position.x}, ${position.y}, ${position.aim}), x*y = ${position.x * position.y}`)
})