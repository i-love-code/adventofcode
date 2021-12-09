const fs = require('fs');
const rl = require('readline');

const readNumberPerLine = function (filename, callback) {
    let lines = [];

    rl.createInterface({
        input: fs.createReadStream(filename),
        terminal: false
    })
    .on('line', (line) => {
        try {
            const depth = parseInt(line)
            lines.push(depth)
        }
        catch(ex) {
            console.error(`Failed to read line: ${line}`)
        }
    })
    .on('close', function () {
        callback(lines)
    })
}

const readSplitLines = function (filename, callback) {
    let lines = [];

    rl.createInterface({
        input: fs.createReadStream(filename),
        terminal: false
    })
    .on('line', (line) => {
        
        lines.push(line.trim().split(' ').map(x => x.trim()))
    })
    .on('close', function () {
        callback(lines)
    })
}

const readLines = function (filename, callback) {
    let lines = [];

    rl.createInterface({
        input: fs.createReadStream(filename),
        terminal: false
    })
    .on('line', (line) => {
        lines.push(line)
    })
    .on('close', function () {
        callback(lines)
    })
}

module.exports = {
    readNumberPerLine,
    readSplitLines,
    readLines
}