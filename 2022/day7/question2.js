const fileInputHelper = require('../../utils/inputReader')

const printFileSystem = (folderOrFile, numIndents = 0) => {
    const isFolder = !!folderOrFile.contents
    const printPrefix = new Array(numIndents).fill('').map(x => '\t').join('')

    if (isFolder) {
        console.log(`${printPrefix}- ${folderOrFile.name} (dir)`)

        folderOrFile.contents.map(innerItem => printFileSystem(innerItem, numIndents + 1))
    } else {
        console.log(`${printPrefix}- ${folderOrFile.name} (file, size=${folderOrFile.size})`)
    }
}

const OVERSIZED_FOLDER_SIZE = 100000
let totaldirsize = BigInt(0)

const getFolderSize = (folder) => {
    const sizeOfFiles = folder.contents.reduce((total, folderItem) => total + (folderItem?.size ?? 0), 0);
    const sizeOfSubfolders = folder.contents.filter(x => !!x.contents).map(getFolderSize).reduce((total, val) => total + val, 0)

    return sizeOfFiles + sizeOfSubfolders
}

const getFolderSizes = (folder) => {
    const sizeOfFolder = getFolderSize(folder)
    const subfolders = folder.contents.filter(x => !!x.contents).map(getFolderSizes).filter(x => x.length > 0).flat()

    return [{ name: folder.name, size: sizeOfFolder }, ...subfolders]
}

fileInputHelper.readLines('realInput.txt', commands => {
    let activeFolder = null
    let isReadingContents = false
    let fileSystem = []

    commands.forEach(command => {
        console.log(`Command: "${command}" being executed in ${activeFolder?.name ?? 'No folder'}`)

        if (command[0] == '$') {
            const parsedCommand = command.match(/(\$) (cd|ls)( )*(.*)/i)
            const commandType = parsedCommand[2]

            if (commandType == 'cd') {
                const navigationTarget = parsedCommand[4]

                console.log(`Found 'cd' with target: `, navigationTarget)

                if (navigationTarget == '/') {
                    fileSystem.push({ name: '/', contents: [] })
                    activeFolder = fileSystem[0]
                } else if (navigationTarget == '..') {
                    activeFolder = activeFolder.parent
                } else {
                    const folderName = parsedCommand[4]

                    console.log(`- Navigated into ${folderName}:`, activeFolder)

                    const targetFolder = activeFolder.contents.find(x => x.name == folderName && !!x.contents)

                    if (!targetFolder) {
                        console.log(`- Folder ${folderName} not found`)
                        return
                    }

                    parentFolder = activeFolder
                    activeFolder = activeFolder.contents.find(x => x.name == folderName && !!x.contents)

                    console.log(`- Navigated into ${folderName}`)
                }

                isReadingContents = false
            } else if (commandType == 'ls') {
                isReadingContents = true
            }
        } else if (isReadingContents) {
            const parsedDirectoryItem = command.match(/([0-9]+|dir) (.*)/)

            if (parsedDirectoryItem[1] == 'dir') {
                const folderName = parsedDirectoryItem[2]
                console.log(`- Created folder: ${folderName}`)
                activeFolder.contents.push({ name: folderName, contents: [], parent: activeFolder })
            } else {
                const fileSize = parseInt(parsedDirectoryItem[1])
                const fileName = parsedDirectoryItem[2]

                totaldirsize += BigInt(fileSize)
                console.log(`- Created file: ${fileName} (${fileSize} bytes)`)
                activeFolder.contents.push({ name: fileName, size: fileSize })
            }
        } else {
            console.log(`Unrecognized command: `, command)
        }
    })

    console.log(`\n\nFile System Result`)

    printFileSystem(fileSystem[0])

    const folderSizes = getFolderSizes(fileSystem[0])

    const totalFolderSize = folderSizes[0].size // root

    console.log(`Total directory size: `, totalFolderSize)

    console.log(`Total available space: `, 70000000 - totalFolderSize)

    const spaceToFree = Math.abs(30000000 - (70000000 - totalFolderSize))

    console.log(`Space to free: `, spaceToFree)

    const sortedFolders = folderSizes.sort((x, y) => y.size - x.size).reverse()

    const folderToDelete = sortedFolders.find(x => x.size >= spaceToFree)

    console.log(`Folder to delete: `, folderToDelete)
})