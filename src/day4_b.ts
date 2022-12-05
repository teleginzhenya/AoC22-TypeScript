import { input } from "./day4_input";

function prepareSet(range: string) {
    const [rangeStart, rangeEnd] = range.split('-');
    const start = parseInt(rangeStart, 10);
    const end = parseInt(rangeEnd, 10);
    const length = end - start + 1;

    return new Set(new Array(length).fill(1).map((_, idx) => idx + start));
}

function prepareSets(row: string) {
    const [rangeOne, rangeTwo] = row.split(',');
    const setOne = prepareSet(rangeOne);
    const setTwo = prepareSet(rangeTwo);

    return ({
        setOne,
        setTwo
    })
}

function isFirstSetOverlapsSecond(setOne: Set<number>, setTwo: Set<number>) {
    let isOverlaps = false;

    setOne.forEach((itemInFirst) => {
        if (setTwo.has(itemInFirst)) {
            isOverlaps = true;
        }
    });

    return isOverlaps;
}

const answer = input.split('\n').reduce<number>((acc, row) => {
    const { setOne, setTwo } = prepareSets(row)
    if (setOne.size < setTwo.size) {
        if (isFirstSetOverlapsSecond(setOne, setTwo)) {
            acc += 1;
        }
    } else {
        if (isFirstSetOverlapsSecond(setTwo, setOne)) {
            acc += 1;
        }
    }

    return acc;
}, 0)

console.log(answer);

export { };
