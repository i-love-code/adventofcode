const fileInputHelper = require('../../utils/inputReader')

fileInputHelper.readCommaDelimitedLines('realInput.txt', elfAssignmentPairs => {

    const parsedElfAssignments = elfAssignmentPairs.map((elfAssignmentPair, pairIndex) => {
        return elfAssignmentPair.map((elfAssignment, elfIndex) => {
            const startAndEndSections = elfAssignment.split('-').map(sectionString => parseInt(sectionString));

            let sections = []
            for (let sectionNum = startAndEndSections[0]; sectionNum <= startAndEndSections[1]; sectionNum++) {
                sections.push(sectionNum)
            }

            return sections
        })
    })

    console.log(parsedElfAssignments)

    const fullyOverlappedSectionAssignments = parsedElfAssignments.filter((elfSectionPairs, pairIndex) => {
        // For each pair of elves...
        return elfSectionPairs.filter(currentElfSections => {
            // Is it's section assignments fully covered in another pair (besides itself)?
            return elfSectionPairs.filter(elfSectionPair => currentElfSections.some(currentElfSection => elfSectionPair.includes(currentElfSection))).length > 1
        }).length
    })

    console.log(`Number of fully-contained section assignment overlaps: `, fullyOverlappedSectionAssignments.length)
})