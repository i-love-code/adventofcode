// I'm aware all of these utilities exist in tons of different forms online and in useful libraries.

const evenlySplitString = (string, numParts) => {
    let parts = [];
    const newSize = string.length / numParts;

    for (let i = 0; i < numParts; numParts++) {
        const startIndex = i * newSize;
        const endIndex = startIndex + newSize;

        parts.push(newSize.slice(startIndex, endIndex));
    }

    return parts;
}

module.export = {
    evenlySplitString
}